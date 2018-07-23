// SSR
if (typeof window === 'undefined') {
  try {
    global.window = global
    module.exports = require('react-diff-view');
  } finally {
    delete global.window
  }
// dev
} else {
  module.exports = require('react-diff-view');
}
