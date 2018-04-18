const path = require('path')
const select = require('unist-util-select')

const isRelativeUrlRegex = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/

function remarkGithubImages(options) {
  return (ast) => {
    select(ast, 'image').forEach((node) => {
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