// @ts-check

exports.stepRoute = ({ owner, repo, branch, version, step }) =>
  `/${owner}/${repo}/${branch}/${version}/step/${step}`

exports.diffRoute = ({ owner, repo, branch, srcVersion, destVersion }) =>
  `/${owner}/${repo}/${branch}/${destVersion}/diff/${srcVersion}`
