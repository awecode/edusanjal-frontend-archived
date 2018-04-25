const webpack = require('@cypress/webpack-preprocessor')
const path = require('path')

const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../')
    }
  }
}

const options = {
  // send in the options from your webpack.config.js, so it works the same
  // as your app's code
  webpackOptions,
  watchOptions: {}
}

module.exports = on => {
  on('file:preprocessor', webpack(options))
}