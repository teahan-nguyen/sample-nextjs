const config = {
  changelogPath: 'CHANGELOG.md',
  mainBranch: 'master',
  developBranch: 'dev',
  prefixBeforeVersionBranch: 'release/v',
  ignoreRegexList: [/^docs\(changelog\)/],
  releaseBranchRule: 'dev',
  features: {
    suggestNewBranch: 'ask',
    updateChangelog: 'bypass',
    commitUpdatedChangelog: 'bypass',
  },
  // https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type
  commitMessagePrefixes: [
    {
      desc: 'BREAKING CHANGES',
      regex: /^BREAKING CHANGE\b/,
      releaseType: 'major',
    },
    {
      desc: 'Features',
      regex: /^feat\b/,
      releaseType: 'minor',
    },
    {
      desc: 'Bug Fixes',
      regex: /^fix\b/,
      releaseType: 'patch',
    },
    {
      desc: 'Refactoring',
      regex: /^refactor\b/,
      releaseType: 'patch',
    },
    {
      desc: 'Tests',
      regex: /^test\b/,
      releaseType: 'patch',
    },
    {
      desc: 'Build Configuration',
      regex: /^build\b/,
      releaseType: 'patch',
    },
    {
      desc: 'CI Configuration',
      regex: /^ci\b/,
      releaseType: 'patch',
    },
    {
      desc: 'Documentation',
      regex: /^docs\b/,
      releaseType: 'patch',
    },
    {
      desc: 'Performance Improvements',
      regex: /^perf\b/,
      releaseType: 'patch',
    },
    {
      desc: 'Formatting',
      regex: /^style\b/,
      releaseType: 'patch',
    },
  ],
}

module.exports = config
