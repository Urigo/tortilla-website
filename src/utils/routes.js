// @ts-check

exports.stepRoute = ({ owner, repo, branch, version, step }) => {
  let route = `/${owner}/${repo}`

  if (branch) {
    route += `/${branch}`
  }

  if (version) {
    route += `/${version}/step/${step}`
  }

  return route
}

exports.diffRoute = ({ owner, repo, branch, srcVersion, destVersion }) =>
  `/${owner}/${repo}/${branch}/${destVersion}/diff/${srcVersion}`
