const path = require('path')
const { kebabCase } = require('lodash')
const { Dump } = require('tortilla/dist/dump')
const diffPageTemplate = path.resolve('src/templates/diff-page.js')

// tutorial/tutorial-name/diff/0_1_0/1_0_0
const generatePath = ({
  tutorialName,
  srcVersionNumber,
  destVersionNumber,
}) => {
  return [
    // prefix
    'tutorial',
    // tutorial
    kebabCase(tutorialName),
    // prefix
    'diff',
    // versions
    srcVersionNumber.replace(/\./g, '_'),
    destVersionNumber.replace(/\./g, '_'),
  ].join('/')
}

module.exports = ({
  tutorialName,
  tutorialChunk,
  srcVersionNumber,
  destVersionNumber,
  createPage,
}) => {
  const diffPath = generatePath({
    tutorialName,
    srcVersionNumber,
    destVersionNumber,
  })

  const versionsDiff = Dump.diffReleases(
    tutorialChunk,
    srcVersionNumber,
    destVersionNumber,
  )

  createPage({
    path: diffPath,
    component: diffPageTemplate,
    layout: 'tutorial',
    context: {
      tutorialName,
      srcVersionNumber,
      destVersionNumber,
      versionsDiff,
    }
  })
}
