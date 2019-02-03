const path = require('path')
const { selectAll } = require('unist-util-select')

const isRelativeUrlRegex = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/

function remarkGithubImages(options) {
  return (ast) => {
    selectAll('image', ast).forEach((node) => {
      if (isRelativeUrlRegex.test(node.url)) {
        node.url = 'https://raw.githubusercontent.com/' + path.join(`${options.org}/${options.name}/${options.branch}/.tortilla/manuals/views`, node.url);
      }
    })
  }
}

function remarkGithub(options = {}) {
  return ast => {
    [remarkGithubImages].forEach(func => func(options)(ast))
  }
}

module.exports = remarkGithub