// @ts-check

const { kebabCase } = require('lodash')

exports.stepRoute = ({ step, tutorialName, versionName }) =>
  [
    // prefix
    '/tutorial',
    // tutorial
    kebabCase(tutorialName),
    // version
    kebabCase(versionName),
    // step
    step.id + '-' + kebabCase(step.name),
  ].join('/')

exports.diffRoute = ({ tutorialName, srcVersion, destVersion }) =>
  [
    // prefix
    '/tutorial',
    // tutorial
    kebabCase(tutorialName),
    // prefix
    'diff',
    // destination version
    destVersion.split('.').join('_'),
    // source version
    srcVersion.split('.').join('_'),
  ].join('/')
