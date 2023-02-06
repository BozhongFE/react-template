const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = require('./build.config');
const devConfig = config.dll.dev;
const prodConfig = config.dll.prod;

const webpackConfig = {
  mode: 'none',
  entry: {
    main: './src/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)?$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
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
      // append assets
      ...(Object.keys(prodConfig.entry).map((name) => {
        return new HtmlWebpackTagsPlugin({
          tags: [
            `${name}.dll.js`,
          ],
          append: false
        });
      })),
      // dll manifest
      ...(Object.keys(prodConfig.entry).map((name) => {
        return new webpack.DllReferencePlugin({
          manifest: require(`../${prodConfig.cache}/${name}-manifest.json`),
        });
      })),
      // copy dll
      new CopyPlugin({
        patterns: [
          { from: prodConfig.cache },
        ],
      }),
    ],
  });
}

/**
 * build devlopment
 */
if (process.env.NODE_ENV === 'development') {
  Object.assign(webpackConfig, {
    mode: 'development',
    devServer: {
      allowedHosts: 'all',
      static: [
        {
          directory: path.resolve(__dirname, '..', devConfig.cache),
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
      // append assets
      ...(Object.keys(devConfig.entry).map((name) => {
        return new HtmlWebpackTagsPlugin({
          tags: [
            `${name}.dll.js`,
          ],
          append: false
        });
      })),
      ...webpackConfig.plugins,
      // dll manifest
      ...(Object.keys(devConfig.entry).map((name) => {
        return new webpack.DllReferencePlugin({
          manifest: require(`../${devConfig.cache}/${name}-manifest.json`),
        });
      })),
    ],
  });
}

module.exports = webpackConfig;