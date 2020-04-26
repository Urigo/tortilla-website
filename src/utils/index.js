// Will use the shortest indention as an axis
export const freeText = (text) => {
  if (text instanceof Array) {
    text = text.join('')
  }

  // This will allow inline text generation with external functions, same as ctrl+shift+c
  // As long as we surround the inline text with ==>text<==
  text = text.replace(
    /( *)==>((?:.|\n)*?)<==/g,
    (match, baseIndent, content) => {
      return content
        .split('\n')
        .map((line) => `${baseIndent}${line}`)
        .join('\n')
    }
  )

  const lines = text.split('\n')

  const minIndent = lines
    .filter((line) => line.trim())
    .reduce((soFar, line) => {
      const currIndent = line.match(/^ */)[0].length

      return currIndent < soFar ? currIndent : soFar
    }, Infinity)

  return lines
    .map((line) => line.slice(minIndent))
    .join('\n')
    .trim()
    .replace(/\n +\n/g, '\n\n')
}
