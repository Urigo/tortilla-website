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

lib.parseDiff = (diffStr, options) => {
  options = Object.assign(
    {
      showLong: false,
    },
    options
  )

  // Fix for diff formats of new git versions where deleted and added files won't have
  // trailing paths
  {
    diffStr = diffStr.trim()

    const [match, aPath, bPath, fsMode] =
      diffStr.match(
        /^diff --git ([^ ]+) ([^ ]+)\n([^ ]+) file mode 100644\nindex \w{7}\.\.\w{7}$/
      ) || []

    if (match)
      if (fsMode === 'Added') {
        diffStr += `\n--- /dev/null\n+++ ${bPath}`
      } else {
        diffStr += `\n--- ${aPath}\n+++ /dev/null`
      }
  }

  const tooLong = !options.showLong && diffStr.length >= 8000

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
