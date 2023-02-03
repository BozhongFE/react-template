const path = require('path');
const webpack = require('webpack');

const entry = {
  vendor: ['react', 'react-dom'],
};
module.exports = [
  {
    name: 'dll:dev',
    mode: 'development',
    entry,
    output: {
      path: path.resolve(__dirname, '../.cache/dll/dev'),
      filename: '[name].dll.js',
      library: '[name]_[fullhash]'
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]_[fullhash]',
        path: path.resolve(__dirname, '../.cache/dll/dev/[name]-manifest.json')
      })
    ],
  },
  {
    name: 'dll:prod',
    mode: 'production',
    entry,
    output: {
      path: path.resolve(__dirname, '../.cache/dll/prod'),
      filename: '[name].dll.js',
      library: '[name]_[fullhash]'
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]_[fullhash]',
        path: path.resolve(__dirname, '../.cache/dll/prod/[name]-manifest.json')
      })
    ],
  },
];