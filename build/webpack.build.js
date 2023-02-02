const config = require('./webpack.base.js');

module.exports = Object.assign(config, {
  mode: 'production',
  output: {
    // path: 'dist',
    filename: '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
  },
});