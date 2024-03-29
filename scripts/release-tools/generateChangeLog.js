/* eslint-disable no-console */
const fs = require('fs')

const ansiColor = require('ansi-colors')
const git = require('git-rev-sync')

const {
  changelogPath,
  developBranch,
  mainBranch,
  prefixBeforeVersionBranch,
} = require('./release-tool.config')
const {
  convertBranchToVersion,
  getCommitTypes,
  getSortedBranches,
  removePrefixMessage,
  runCommandLine,
} = require('./utils')
const gitUrl = git.remoteUrl().replace('.git', '')

const HELP_OPTION_KEYWORDS = ['--help', '-h']
const RELEASE_LOCAL_OPTION_KEYWORDS = ['--release-local', '-rl']

const getChangeLogByType = (type, list) => {
  if (list.length <= 0) {
    return ''
  }

  const title = `### ${type}`
  const changeLog = list.reduce((current, value) => {
    const [msg, abbrevCommitHash, commitHash] = value.split('|')
    const link = `${gitUrl}/commit/${commitHash}`
    const content = `   - ${msg} ([${abbrevCommitHash}](${link}))`

    return current + `${content}` + '\n'
  }, '\n')

  return `${title}\n${changeLog}`
}

const getCompareLink = (fromBranch, toBranch) => {
  return `${gitUrl}/-/compare/${encodeURIComponent(fromBranch)}...${encodeURIComponent(toBranch)}`
}

const getBranchInfoList = async (sortedBranches) => {
  const promises = sortedBranches.map(async (branch, index) => {
    const compareBranch = sortedBranches[index + 1]
    const commandGetTime = `git show --summary \`git merge-base ${branch} ${developBranch}\` --format="%ci"`

    const [data, { stdout }] = await Promise.all([
      getCommitTypes(branch, sortedBranches[index + 1]),
      runCommandLine(commandGetTime),
    ])

    const updatedDate = stdout.slice(0, 10)
    const version = convertBranchToVersion(branch)
    const compareLink = getCompareLink(
      compareBranch ? compareBranch.replace('origin/', '') : mainBranch,
      branch.replace('origin/', '')
    )

    return { branch, data, updatedDate, version, compareLink }
  })

  return await Promise.all(promises)
}
const updateFile = async (filePath, value) => {
  if (fs.existsSync(filePath)) {
    await fs.promises.writeFile(filePath, value)
  } else {
    await fs.promises.appendFile(filePath, value)
  }
}

const writeChangeLogMD = (content) => {
  return updateFile(changelogPath, content)
}
const start = async () => {
  const isReleaseLocalBranch = RELEASE_LOCAL_OPTION_KEYWORDS.some((v) => v === process.argv[2])

  if (isReleaseLocalBranch) {
    const currentBranch = git.branch()
    const isReleaseBranch = currentBranch.startsWith(prefixBeforeVersionBranch)
    if (!isReleaseBranch) {
      console.log(
        '\n' + ansiColor.bgRed('ERROR:'),
        `Release local branch mode can work with release branch only, Please switch branch (${currentBranch}) to release branch and try again.\n`
      )
      process.exit(0)
    } else {
      console.log('--release-local')
    }
  }
  const sortedBranches = await getSortedBranches(isReleaseLocalBranch && git.branch())
  const branchInfoList = await getBranchInfoList(sortedBranches)
  const content = branchInfoList
    .map((branchInfo) => {
      const { compareLink, data, updatedDate, version } = branchInfo
      const title = `# [${version}](${compareLink}) (${updatedDate})\n`

      const { incaseCommits } = data

      const cleanMessages = (list) =>
        list.map((v) => removePrefixMessage(v)).filter((v) => Boolean(v))

      const detail = incaseCommits
        .map(({ commits, desc }) => getChangeLogByType(desc, cleanMessages(commits)))
        .join('\n')

      return title + detail
    })
    .join('\n')

  await writeChangeLogMD(content)
  await runCommandLine(`yarn prettier --write "./${changelogPath}"`)

  const processDoneText = `${ansiColor.bold.greenBright(
    'DONE:'
  )} ${changelogPath} has been updated.\n`

  console.log(processDoneText)
}

if (HELP_OPTION_KEYWORDS.some((v) => v === process.argv[2])) {
  console.log(
    `\nOptions: \n--release-local | -rl  Release local branch mode for generate CHANGELOG on local branch. Only work with release branch. eg. ${prefixBeforeVersionBranch}1.0.0\n`
  )
  process.exit(0)
}
start()
