const { kebabCase } = require('lodash')

exports.stepRoute = ({ step, tutorialName, versionName }) =>
  [
    // prefix
    'tutorial',
    // tutorial
    kebabCase(tutorialName),
    // version
    kebabCase(versionName),
    // step
    step.id + '-' + kebabCase(step.name),
  ].join('/')
