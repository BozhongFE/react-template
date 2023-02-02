const config = require('./webpack.base.js');

module.exports = Object.assign(config, {
  mode: 'development',
  devServer: {
    allowedHosts: 'all',
    client: {
      // wss + domain
      // webSocketURL: 'wss://domain/pathname/ws',
      // ws + (domina or ip)
      // webSocketURL: `ws://${'0.0.0.0'}:8080/ws`,
    },
  },
});