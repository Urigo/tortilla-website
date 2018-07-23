const createPages = require('./src/startup/create-pages')

exports.createPages = createPages

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      loaders: [
        {
          test: /react-modal/,
          loader: 'null-loader',
        }
      ]
    })
  }
}
