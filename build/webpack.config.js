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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
            plugins: [
              // '@babel/plugin-transform-runtime',
              // '@babel/plugin-proposal-class-properties',
              // '@babel/plugin-proposal-nullish-coalescing-operator',
              // '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-transform-runtime',
              './build/webpack.plugin.css.modules.js',
            ],
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)?$/,
        oneOf: [
          {
            resourceQuery: /css_modules/,
            use: [
              'style-loader',
              '@teamsupercell/typings-for-css-modules-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true
                },
              },
              'postcss-loader',
              'less-loader',
            ],
          },
          {
            use: [
              'style-loader',
              '@teamsupercell/typings-for-css-modules-loader',
              'css-loader',
              'postcss-loader',
              'less-loader',
            ],
          }
        ],
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

// function cssModulesPlugin() {
//   const CSS_FILE_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];
//   return {
//     visitor: {
//       ImportDeclaration(path) {
//         const { specifiers, source } = path.node;
//         const { value } = source;
//         if (
//           specifiers.length > 0
//           && CSS_FILE_EXTENSIONS.includes(path.extname(value))
//         ) {
//           source.value = `${value}?css_modules`;
//         }
//       },
//     },
//   };
// };