const path = require('path')
const { kebabCase } = require('lodash')
const { Dump } = require('tortilla/dist/dump')
const tutorialTemplate = path.resolve('src/templates/tutorial-page.js')
const { diffRoute } = require('../utils/routes')

module.exports = ({
  createPage,
  common,
  params: {
    srcVersionNumber,
    destVersionNumber,
    tutorialChunk,
  },
}) => {
  const diffPath = diffRoute({
    tutorialName: common.tutorialName,
    srcVersion: srcVersionNumber,
    destVersion: destVersionNumber,
  })

  const versionsDiff = Dump.diffReleases(
    tutorialChunk,
    srcVersionNumber,
    destVersionNumber,
  )

  createPage({
    path: diffPath,
    component: tutorialTemplate,
    layout: 'tutorial',
    context: {
      ...common,
      common,
      contentType: 'diffs',
      contentData: {
        srcVersionNumber,
        destVersionNumber,
        versionsDiff,
      },
    }
  })
}
