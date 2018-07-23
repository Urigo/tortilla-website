const createPages = require('./src/startup/create-pages')

exports.createPages = createPages

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  switch (stage) {
    case 'develop':
      actions.setWebpackConfig({
        devtool: 'cheap-module-source-map'
      })
      break
    case 'build-html':
      actions.setWebpackConfig({
        loaders: [
          {
            test: /react-modal/,
            loader: 'null-loader',
          }
        ]
      })
      break
  }
}
