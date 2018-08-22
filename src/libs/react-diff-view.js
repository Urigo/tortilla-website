let lib

// SSR
if (typeof window === 'undefined') {
  try {
    global.window = global
    lib = { ...require('react-diff-view') }
  } finally {
    delete global.window
  }
// dev
} else {
  lib = { ...require('react-diff-view') }
}

const { parseDiff } = lib

lib.parseDiff = (diffStr) => {
  const tooLong = diffStr.length >= 8000

  // If so, get only paths metadata
  if (tooLong) {
    diffStr = diffStr.trim().split('\n').slice(0, 4).join('\n')
  }

  const diff = parseDiff(diffStr)

  diff.forEach((diffChunk) => {
    diffChunk.tooLong = tooLong
  })

  return diff
}

module.exports = lib
