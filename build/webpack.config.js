const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = require('./build.config');

const webpackConfig = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  plugins: [
    // append assets
    ...(Object.keys(config.dll.entry).map((name) => {
      return new HtmlWebpackTagsPlugin({
        tags: [
          `${name}.dll.js`,
        ],
        append: false
      });
    }))
    ,
    // build html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

/**
 * build production
 */
if (process.env.NODE_ENV === 'production') {
  Object.assign(webpackConfig, {
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
    },
    plugins: [
      ...webpackConfig.plugins,
      // dll manifest
      ...(Object.keys(config.dll.entry).map((name) => {
        return new webpack.DllReferencePlugin({
          manifest: require(`../${config.dll.cache.prod}/${name}-manifest.json`),
        });
      })),
      // copy dll
      new CopyPlugin({
        patterns: [
          { from: config.dll.cache.prod },
        ],
      }),
    ],
  });
}

/**
 * build devlopment
 */
if (process.env.NODE_ENV !== 'production') {
  Object.assign(webpackConfig, {
    mode: 'development',
    devServer: {
      allowedHosts: 'all',
      static: [
        {
          directory: path.resolve(__dirname, '..', config.dll.cache.dev),
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
      ...webpackConfig.plugins,
      // dll manifest
      ...(Object.keys(config.dll.entry).map((name) => {
        return new webpack.DllReferencePlugin({
          manifest: require(`../${config.dll.cache.dev}/${name}-manifest.json`),
        });
      })),
    ],
  });
}

module.exports = webpackConfig;