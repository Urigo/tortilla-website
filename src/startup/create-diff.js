const path = require('path')
const { kebabCase } = require('lodash')
const { diffReleases } = require('../libs/tortilla')
const { diffRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial.js')

module.exports = ({
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

  const versionsDiff = diffReleases(
    tutorialChunk,
    srcVersionNumber,
    destVersionNumber,
  )

  paths.forEach((path) => {
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
      }
    })
  })
}
