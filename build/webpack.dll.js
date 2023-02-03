const path = require('path');
const webpack = require('webpack');

const config = require('./build.config');

module.exports = [
  {
    name: 'dll:dev',
    mode: 'development',
    entry: config.dll.entry,
    output: {
      path: path.resolve(__dirname, '..', config.dll.cache.dev),
      filename: '[name].dll.js',
      library: '[name]_[fullhash]'
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]_[fullhash]',
        path: path.resolve(__dirname, '..', config.dll.cache.dev, '[name]-manifest.json'),
      })
    ],
  },
  {
    name: 'dll:prod',
    mode: 'production',
    entry: config.dll.entry,
    output: {
      path: path.resolve(__dirname, '..', config.dll.cache.prod),
      filename: '[name].dll.js',
      library: '[name]_[fullhash]'
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]_[fullhash]',
        path: path.resolve(__dirname, '..', config.dll.cache.prod, '[name]-manifest.json'),
      })
    ],
  },
];