const createPages = require('./src/startup/create-pages')

exports.createPages = createPages

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-html') {
    config.loader('null', {
      test: /react-modal/,
      loader: 'null-loader',
    })
  }
}
