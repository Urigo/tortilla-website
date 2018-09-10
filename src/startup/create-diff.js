const { kebabCase } = require('lodash')
const path = require('path')
const { diffReleases } = require('tortilla')
const { diffRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial.js')

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
  const paths = [
    // Source version prefix
    diffRoute({
      tutorialName: common.tutorialName,
      srcVersion: srcVersionNumber,
      destVersion: destVersionNumber,
    })
  ]

  // No version prefix
  if (destVersionNumber == common.tutorialVersion) {
    paths.push(
      diffRoute({
        tutorialName: common.tutorialName,
        srcVersion: srcVersionNumber,
      })
    )
  }

  const versionsDiff = await diffReleases(
    tutorialChunk,
    destVersionNumber,
    srcVersionNumber,
  )

  return Promise.all(paths.map((path) => {
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
      }
    })
  }))
}
