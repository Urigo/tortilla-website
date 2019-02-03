// @ts-check

const { kebabCase } = require('lodash')

// This will inject the version unless it is not defined in which case the placeholder
// will be replaced with an empty string
const withVersion = (url, version) => {
  if (version) {
    return url.replace(/%VERSION%/g, `version/${kebabCase(version)}`)
  }

  return url.replace(/\/%VERSION%/g, '')
}

exports.stepRoute = ({ tutorialName, version, step }) =>
  withVersion(
    [
      // prefix
      '/tutorial',
      // tutorial
      kebabCase(tutorialName),
      // version
      '%VERSION%',
      // prefix
      'step',
      // step
      step,
    ].join('/'),
    version
  )

exports.diffRoute = ({ tutorialName, srcVersion, destVersion }) =>
  withVersion(
    [
      // prefix
      '/tutorial',
      // tutorial
      kebabCase(tutorialName),
      // version
      '%VERSION%',
      // prefix
      'diff',
      // destination version
      kebabCase(srcVersion),
    ].join('/'),
    destVersion
  )

// /tutorial/my-tutorial/1.1.1(/sub-route) -> true
exports.isVersionSpecific = pathname => /\/version\/\d+-\d+-\d+/.test(pathname)
