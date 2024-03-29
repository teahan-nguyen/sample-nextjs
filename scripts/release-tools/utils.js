const util = require('util')
const exec = util.promisify(require('child_process').exec)

const ansiColor = require('ansi-colors')
const semver = require('semver')

const config = require('./release-tool.config')
const { prefixBeforeVersionBranch } = require('./release-tool.config')
const runCommandLine = async (command, logCommand) => {
  if (logCommand) {
    // eslint-disable-next-line no-console
    console.log('\n', ansiColor.gray('$ ' + command))
  }
  try {
    const { stderr, stdout } = await exec(command)
    return { stderr, stdout }
  } catch (e) {
    console.error(e)
  }
}

const filterCommitByPrefix = (regex, commits) => commits.filter((v) => v.match(regex))

const getCommitTypes = async (from, to) => {
  const target = to !== undefined ? `${from}...${to}` : `${from}`
  // https://devhints.io/git-log-format
  const command = `git log --pretty="format:%s|%h|%H" ${target}`
  const { stdout: commitOutput } = await runCommandLine(command)
  const commits = commitOutput.split('\n').filter((v) => Boolean(v))
  const ignoredCommits = config.ignoreRegexList.reduce(
    (prev, regex) => prev.concat(filterCommitByPrefix(regex, commits)),
    []
  )
  const ignoreRemovedCommits = commits.filter((v) => !ignoredCommits.includes(v))

  const incaseCommits = config.commitMessagePrefixes
    .map((value) => ({
      ...value,
      commits: filterCommitByPrefix(value.regex, ignoreRemovedCommits),
    }))
    .filter((item) => item.commits.length > 0)

  return {
    commits,
    incaseCommits,
    ignoredCommits,
  }
}

const removePrefixMessage = (message) => {
  return message.split(':').slice(1).join(':').trim()
}
const convertBranchToVersion = (branchName) => {
  return semver.clean(branchName.replace(/[a-z/]/g, ''))
}
const getSortedBranches = async (extendBranch) => {
  const command = `git branch -r --list origin/${prefixBeforeVersionBranch}\\*`
  const { stdout } = await runCommandLine(command)
  const branches = stdout
    .trim()
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => Boolean(v))
  extendBranch && branches.push(extendBranch)
  const sortedBranches = branches.sort((a, b) => {
    const aVersion = convertBranchToVersion(a)
    const bVersion = convertBranchToVersion(b)
    return semver.rcompare(aVersion, bVersion)
  })

  return sortedBranches
}

const getCenterString = (value, width) => {
  const paddingLeftRight = Math.abs(Math.ceil((width - value.length) / 2))
  const tabStr = Array(paddingLeftRight)
    .fill(null)
    .reduce((prev) => prev + ' ', '')
  return tabStr + value + tabStr
}

module.exports = {
  convertBranchToVersion,
  getCenterString,
  getCommitTypes,
  getSortedBranches,
  removePrefixMessage,
  runCommandLine,
}
