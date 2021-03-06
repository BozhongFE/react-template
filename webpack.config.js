const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const address = require('address');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const {
  projectPath,
  outputPath,
  CopyShareImg,
  publicPath,
} = require('./bz.config');

/**
 * 获取 ip
 */
const getAddressIP = () => {
  const ip = address.ip();
  if (/192(\.[0-9]{1,3}){3}/.test(ip)) return ip;
  return address.ip('以太网') || ip;
};

module.exports = {
  entry: {
    main: './src/index',
  },
  output: {
    path: outputPath,
    publicPath: process.env.NODE_ENV === 'production' ? projectPath : undefined,
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name].js?[chunkhash]'
        : '[name].js',
    chunkFilename: '[id].js?[chunkhash]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining',
              './webpack.css.module.js',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /css_modules/,
            use: [
              'style-loader',
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  namedExport: true,
                  camelCase: true,
                  minimize: true,
                  localIdentName: '[name]-[local]__[hash:base64:5]',
                },
              },
              'postcss-loader',
            ],
          },
          {
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
        ],
      },
      {{#if less}}
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /css_modules/,
            use: [
              'style-loader',
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  namedExport: true,
                  camelCase: true,
                  minimize: true,
                  localIdentName: '[name]-[local]__[hash:base64:5]',
                },
              },
              'postcss-loader',
              'less-loader',
            ],
          },
          {
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader',
            ],
          },
        ],
      },
      {{/if}}
      {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash].[ext]',
            limit: 12 * 1024,
            mimetype: 'application/font-woff',
          },
        },
      },
    ],
  },
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: getAddressIP() || '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
  },
  plugins: [],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.mode = 'development';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      bzConfigPath: 'https://source.office.bzdev.net/common/js/config.js',
      nodeEnv: process.env.NODE_ENV,
      inject: false,
      projectPath,
      pagePath: publicPath,
    }),
  ]);
} else {
  module.exports.mode = 'production';
  module.exports.devtool = false;
  module.exports.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            reduce_vars: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
    ],
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      nodeEnv: process.env.NODE_ENV,
      inject: false,
      projectPath,
      pagePath: publicPath,
      bzConfigPath: 'https://source.bozhong.com/common/js/config.js',
    }),
    new CopyShareImg(),
    new HardSourceWebpackPlugin(),
  ]);
}
