/* eslint-disable no-console */
const ansiColor = require('ansi-colors')
const git = require('git-rev-sync')
const prompts = require('prompts')
const semver = require('semver')

const {
  changelogPath,
  developBranch,
  features,
  mainBranch,
  prefixBeforeVersionBranch,
  releaseBranchRule,
} = require('./release-tool.config')
const {
  convertBranchToVersion,
  getCenterString,
  getCommitTypes,
  getSortedBranches,
  removePrefixMessage,
  runCommandLine,
} = require('./utils')

const RELEASE_ANY_BRANCH_OPTION_KEYWORDS = ['--any-branch', '-anb']

const echoSummary = ({ currentBranch, latestVersion, nextVersion, reason, releaseType }) => {
  const titleStr = '⭐️ Next Version ⭐️'
  const branchStr = `release/v${nextVersion}`
  const releaseTypeStr = `ReleaseType: ${releaseType}`
  const reasonStr = `Reason: ${reason}`
  const descStr = `from latest version (${latestVersion}) to current branch (${currentBranch})`
  const padding = 10

  const contentList = [titleStr, branchStr, releaseTypeStr, reasonStr, descStr]

  const longestWording = [...contentList].sort((a, b) => b.length - a.length)[0]
  const width = padding * 2 + longestWording.length
  const borderWidthStr = Array(width).fill('=').join('')

  console.log(`\n${borderWidthStr}\n
  ${contentList.map((v) => getCenterString(v, width)).join('\n')}
  \n${borderWidthStr}\n
  `)
}

const createNewBranch = async (branchName) => {
  const command = `git checkout -b ${branchName}`
  try {
    const { stderr, stdout } = await runCommandLine(command, true)
    console.log(stdout)
    console.error(stderr)
  } catch (error) {
    console.error(`${ansiColor.bgRed('ERROR:')} ${error}`)
    process.exit(0)
  }
}

const echoChangelog = (type, list) => {
  if (list.length <= 0) {
    return
  }

  const title = ansiColor.green(` ### ${type}\n`)

  const changeLog = list.reduce((current, value) => {
    const [msg, abbrevCommitHash] = value.split('|')
    const colorfulAbbrevCommitHash = ansiColor.blue(`${abbrevCommitHash}`)
    const content = `   - ${msg} (${colorfulAbbrevCommitHash})`

    return current + `${content}` + '\n'
  }, '\n')

  console.log(title, changeLog)
}

const checkReleaseType = ({ commits, majorChanges, minorChanges, patchChanges }) => {
  if (majorChanges > 0) {
    return 'major'
  } else if (minorChanges > 0) {
    return 'minor'
  } else if (patchChanges > 0) {
    return 'patch'
  } else {
    console.log(
      '\n' + ansiColor.bgYellow('STOP: '),
      'No changes detected, Please recheck and try again.\nThe commit message should be structured as follows: https://www.conventionalcommits.org/en/v1.0.0/#summary'
    )
    console.log('Commits:', commits, '\n')
    process.exit(0)
  }
}

const checkCommitsSemantic = async (currentBranch, targetBranch) => {
  const { commits, ignoredCommits, incaseCommits } = await getCommitTypes(
    currentBranch,
    targetBranch
  )
  const reason = incaseCommits.reduce((prevStr, currentItem, index) => {
    const { commits: curCommits, desc, releaseType } = currentItem
    const comma = `${index > 0 ? ', ' : ''}`
    const title = `${desc} (${releaseType})`
    return prevStr + `${comma}${title}: ${curCommits.length}`
  }, '')
  const [majorChanges, minorChanges, patchChanges] = ['major', 'minor', 'patch'].map(
    (releaseType) => incaseCommits.filter((item) => item.releaseType === releaseType).length
  )

  ignoredCommits.length > 0 &&
    console.log(ansiColor.yellowBright('Ignored commits:\n'), ignoredCommits.toString(), '\n')

  const releaseType = checkReleaseType({ majorChanges, minorChanges, patchChanges, commits })

  echoAllTypeChangelog(incaseCommits)

  return { releaseType, reason }
}

const echoAllTypeChangelog = (incaseCommits) => {
  const cleanMessages = (list) => list.map((v) => removePrefixMessage(v)).filter((v) => Boolean(v))
  incaseCommits.forEach(({ commits, desc }) => echoChangelog(desc, cleanMessages(commits)))
}

const getLatestVersion = async () => {
  const sortedBranches = await getSortedBranches()
  const latestVersion = sortedBranches.map((branch) => convertBranchToVersion(branch))[0]

  return latestVersion
}
const stopProcessWithReleaseBranch = (currentBranch) => {
  console.log(
    '\n' + ansiColor.red('ERROR:'),
    `Can't work with release branch (${currentBranch}) please switch branch to ${developBranch} or something else.\n`
  )
  process.exit(0)
}
const stopProcessReleaseBranchRule = (currentBranch) => {
  console.log(
    '\n' + ansiColor.red('ERROR:'),
    `Release process can working only branch of this rules (${releaseBranchRule})\nPlease switch branch or use "--any-branch | -anb" if you still want to run this process on current branch (${currentBranch}).`
  )
  process.exit(0)
}

const promptsToggle = async ({ initial, message }) => {
  const { value } = await prompts({
    type: 'toggle',
    name: 'value',
    message,
    initial,
    active: 'yes',
    inactive: 'no',
  })
  return value
}
const autoUpdateChangelog = async (newBranch) => {
  let needGenerateChangelog
  const processType = features.updateChangelog

  switch (processType) {
    case 'ask':
      needGenerateChangelog = await promptsToggle({
        message: `You want to update changelog (${changelogPath}) from current branch (${newBranch}) now?`,
        initial: true,
      })
      break
    case 'bypass':
      needGenerateChangelog = true
      break
    default:
      return false
  }

  if (needGenerateChangelog) {
    const genChangelogReleaseLocalCommand = `node ${__dirname}/generateChangeLog.js --release-local`
    await runCommandLine(genChangelogReleaseLocalCommand, true)

    console.log(ansiColor.greenBright('UPDATED: '), changelogPath)
  }
  return needGenerateChangelog
}

const autoCommitUpdateChangelog = async (nextVersion) => {
  const processType = features.commitUpdatedChangelog
  let isAutoCommitUpdateChangelog
  switch (processType) {
    case 'ask':
      isAutoCommitUpdateChangelog = await promptsToggle({
        message: 'You want to commit update changelog now?',
        initial: false,
      })
      break
    case 'bypass':
      isAutoCommitUpdateChangelog = true
      break
    default:
      return false
  }

  if (isAutoCommitUpdateChangelog) {
    const command = `git add ${changelogPath} && git commit -m "docs(changelog): update changelog to version ${nextVersion}"`
    await runCommandLine(command, true)
  }
  return isAutoCommitUpdateChangelog
}

const checkNeedCreateNewBranch = async () => {
  const processType = features.suggestNewBranch
  switch (processType) {
    case 'ask':
      return await promptsToggle({
        message: 'You want to create new branch now?',
        initial: false,
      })
    case 'bypass':
      return true
    default:
      return false
  }
}

const startProcess = async () => {
  const currentBranch = git.branch()
  if (currentBranch.match(prefixBeforeVersionBranch)) {
    stopProcessWithReleaseBranch(currentBranch)
  }

  const anyBranchMode = RELEASE_ANY_BRANCH_OPTION_KEYWORDS.some((v) => v === process.argv[2])
  const needStopProcessFromBranchRule = !anyBranchMode && !currentBranch.match(releaseBranchRule)
  if (needStopProcessFromBranchRule) {
    stopProcessReleaseBranchRule(currentBranch)
  }

  const latestVersion = await getLatestVersion()

  const isPrevVersionNotFound = latestVersion === undefined

  let nextVersion = ''
  if (isPrevVersionNotFound) {
    const { value: initVersion } = await prompts({
      type: 'select',
      name: 'value',
      message: 'Pick a initial version',
      choices: [
        { title: 'v0.0.0', value: '0.0.0' },
        { title: 'v1.0.0', value: '1.0.0' },
      ],
      initial: 0,
    })
    nextVersion = initVersion
  }

  const targetBranch = `origin/${
    isPrevVersionNotFound ? `${mainBranch}` : `${prefixBeforeVersionBranch}${latestVersion}`
  }`
  const { reason, releaseType } = await checkCommitsSemantic(currentBranch, targetBranch)

  const foundPrevVersion = !isPrevVersionNotFound

  if (foundPrevVersion) {
    nextVersion = semver.inc(latestVersion, releaseType)
  } else if (nextVersion === '0.0.0') {
    nextVersion = semver.inc(nextVersion, releaseType)
  }

  echoSummary({
    currentBranch,
    latestVersion: latestVersion ?? `origin/${mainBranch}`,
    nextVersion,
    reason,
    releaseType,
  })

  const needCreateNewBranch = await checkNeedCreateNewBranch()
  if (needCreateNewBranch) {
    const newBranch = `release/v${nextVersion}`
    await createNewBranch(newBranch)
    const isUpdateChangelog = await autoUpdateChangelog(newBranch)
    if (isUpdateChangelog) {
      await autoCommitUpdateChangelog(nextVersion)
    }
    console.log('\nUse "git push" for push your local branch to the remote.\n')
  }
}
console.log('Running ...\n')
startProcess()
