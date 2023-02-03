const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const config = require('./webpack.base.js');

module.exports = Object.assign(config, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
  },
  plugins: [
    ...config.plugins,
    // dll manifest
    new webpack.DllReferencePlugin({
      manifest: require('../.cache/dll/prod/vendor-manifest.json'),
    }),
    // copy dll
    new CopyPlugin({
      patterns: [
        { from: '.cache/dll/prod' },
      ],
    }),
  ],
});