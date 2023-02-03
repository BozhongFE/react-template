const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  plugins: [
    // append assets
    new HtmlWebpackTagsPlugin({
      tags: [
        'vendor.dll.js',
      ],
      append: false
    }),
    // build html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};