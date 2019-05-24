const { kebabCase } = require('lodash')
const path = require('path')
const { diffReleases } = require('tortilla')
const { diffRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial.js')

module.exports = async ({
  createPage,
  createRedirect,
  common,
  params: {
    srcVersionNumber,
    srcVersionHistory,
    destVersionNumber,
    destVersionHistory,
    tutorialChunk,
  },
}) => {
  const paths = []

  paths.push(
    diffRoute({
      owner: common.tutorialAuthor.username,
      repo: common.tutorialRepo,
      branch: common.tutorialBranch,
      srcVersion: srcVersionNumber,
      destVersion: destVersionNumber,
    })
  )

  if (common.tutorialVersion == common.versionNumber) {
    paths.push(
      diffRoute({
        owner: common.tutorialAuthor.username,
        repo: common.tutorialRepo,
        branch: common.tutorialBranch,
        srcVersion: 'latest',
        destVersion: destVersionNumber,
      })
    )
  }

  const versionsDiff = await diffReleases(
    tutorialChunk,
    destVersionNumber,
    srcVersionNumber
  )

  return Promise.all(paths.map(path =>
    createPage({
      path,
      component: tutorialTemplate,
      context: {
        ...common,
        common,
        contentType: 'diffs',
        contentData: {
          srcVersionNumber,
          srcVersionHistory,
          destVersionNumber,
          destVersionHistory,
          versionsDiff,
        },
      },
    })
  ))
}
