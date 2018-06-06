// @ts-check

const { kebabCase } = require('lodash')

exports.stepRoute = ({ step, tutorialName }) =>
  [
    // prefix
    '/tutorial',
    // tutorial
    kebabCase(tutorialName),
    // prefix
    'step',
    // step
    step.id,
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
