const { Dump } = require('tortilla/dist/dump')
const { Git } = require('tortilla/dist/git')

exports.diffReleases = (dump, srcVersion, destVersion) => {
  let result = ''
  let nameExists = false
  let emailExists = false

  // Upcoming method requires user.name and user.email to be set
  try {
    // If invocation was successful it means name exists
    try {
      Git(['config', '--global', 'user.name'])
      nameExists = true
    } catch (e) {
      Git(['config', '--global', 'user.name', 'tortilla_build_process'])
    }

    // If invocation was successful it means email exists
    try {
      Git(['config', '--global', 'user.email'])
      emailExists = true
    } catch (e) {
      Git(['config', '--global', 'user.email', 'tortilla_build_process@tortilla.com'])
    }

    result = Dump.diffReleases(
      dump,
      srcVersion,
      destVersion,
    )
  }
  finally {
    if (!nameExists) {
      Git(['config', '--global', '--unset', 'user.name'])
    }

    if (!emailExists) {
      Git(['config', '--global', '--unset', 'user.email'])
    }
  }

  return result
}
