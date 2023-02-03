const path = require('path');
const webpack = require('webpack');

const config = require('./webpack.base.js');

const conf = Object.assign(config, {
  mode: 'development',
  devServer: {
    allowedHosts: 'all',
    static: [
      {
        directory: path.resolve(__dirname, '../.cache/dll/dev'),
      }
    ],
    client: {
      // wss + domain
      // webSocketURL: 'wss://domain/pathname/ws',
      // ws + (domina or ip)
      // webSocketURL: `ws://${'0.0.0.0'}:8080/ws`,
    },
  },
  plugins: [
    ...config.plugins,
    // dll manifest
    new webpack.DllReferencePlugin({
      manifest: require('../.cache/dll/dev/vendor-manifest.json'),
    }),
  ],
});

module.exports = conf;