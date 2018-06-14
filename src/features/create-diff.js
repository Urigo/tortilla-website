const path = require('path')
const { kebabCase } = require('lodash')
const { Dump } = require('tortilla/dist/dump')
const { Git } = require('tortilla/dist/git')
const { diffReleases } = require('../libs/tortilla')
const { diffRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial-page.js')

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
    }),
    // No version prefix
    diffRoute({
      tutorialName: common.tutorialName,
      destVersion: destVersionNumber,
    }),
  ]

  const diffPath = diffRoute({
    tutorialName: common.tutorialName,
    srcVersion: srcVersionNumber,
    destVersion: destVersionNumber,
  })

  const versionsDiff = diffReleases(
    tutorialChunk,
    srcVersionNumber,
    destVersionNumber,
  )

  paths.forEach((path) => {
    createPage({
      path,
      component: tutorialTemplate,
      layout: 'tutorial',
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
