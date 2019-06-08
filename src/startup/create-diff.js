const { kebabCase } = require('lodash')
const { resolve } = require('path')
const { diffReleases } = require('tortilla')
const { diffRoute } = require('../utils/routes')

const tutorialTemplate = resolve('src/templates/tutorial.js')

module.exports = async ({
  createPage,
  common,
  params: {
    srcVersionNumber,
    srcVersionHistory,
    destVersionNumber,
    destVersionHistory,
    tutorialChunk,
  },
}) => {
  const path = diffRoute({
    owner: common.tutorialAuthor.username,
    repo: common.tutorialRepo,
    branch: common.tutorialBranch,
    srcVersion: srcVersionNumber,
    destVersion: destVersionNumber,
  })

  const versionsDiff = await diffReleases(
    tutorialChunk,
    destVersionNumber,
    srcVersionNumber
  )

  return createPage({
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
}
