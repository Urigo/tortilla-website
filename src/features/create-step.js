const path = require('path')
const { kebabCase } = require('lodash')

const stepPageTemplate = path.resolve('src/templates/step-page.js')

// tutorial/foo/1.0/bar/1.0/1-baz
const generatePath = ({
  tutorialName,
  tutorialVersion,
  versionName,
  versionNumber,
  step,
}) => {
  return [
    // prefix
    'tutorial',
    // tutorial
    kebabCase(tutorialName),
    tutorialVersion,
    // version
    kebabCase(versionName),
    versionNumber,
    // step
    step.id + '-' + kebabCase(step.name),
  ].join('/')
}

// tutorial/foo/bar/1-baz
const generateLatestPath = ({ tutorialName, versionName, step }) => {
  return [
    // prefix
    'tutorial',
    // tutorial
    kebabCase(tutorialName),
    // version
    kebabCase(versionName),
    // step
    step.id + '-' + kebabCase(step.name),
  ].join('/')
}

module.exports = ({
  tutorialName,
  tutorialVersion,
  versionName,
  versionNumber,
  step,
  createPage,
}) => {
  const paths = [
    generatePath({
      tutorialName,
      tutorialVersion,
      versionName,
      versionNumber,
      step,
    }),
  ]

  if (tutorialVersion === versionNumber) {
    paths.push(
      generateLatestPath({
        tutorialName,
        versionName,
        step,
      })
    )
  }

  paths.forEach(pagePath => {
    createPage({
      path: pagePath,
      component: stepPageTemplate,
      layout: 'index',
      context: {
        step,
      },
    })
  })
}
