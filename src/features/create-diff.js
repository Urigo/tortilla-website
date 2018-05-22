const path = require('path')
const { kebabCase } = require('lodash')
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
  srcVersionNumber,
  destVersionNumber,
  allVersionsDiffs,
  createPage,
}) => {
  const diffPath = generatePath({
    tutorialName,
    srcVersionNumber,
    destVersionNumber,
  })

  // TODO: Replace with Tortilla dump diff
  // We will take the most recent diff as a placeholder
  const versionsDiff = allVersionsDiffs[0]

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
