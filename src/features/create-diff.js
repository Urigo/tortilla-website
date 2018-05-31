const path = require('path')
const { kebabCase } = require('lodash')
const { Dump } = require('tortilla/dist/dump')
const tutorialTemplate = path.resolve('src/templates/tutorial-page.js')

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
  otherVersionsNumbers,
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
    component: tutorialTemplate,
    layout: 'tutorial',
    context: {
      activeContent: 'diffs',
      versionNumber: srcVersionNumber,
      tutorialName,
      destVersionNumber,
      otherVersionsNumbers,
      versionsDiff,
    }
  })
}
