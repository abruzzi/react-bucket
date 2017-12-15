const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const rucksack = require('rucksack-css')
const ROOT_PATH = path.resolve(__dirname)

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'reselect',
      'redux-auth-wrapper',
      'redux-thunk'
    ],
    main: [
      'react-hot-loader/patch',
      path.resolve(ROOT_PATH, 'app/src/index')
    ]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },
      {
        test: /\.jsx?$/,
        loaders: ['eslint-loader'],
        enforce: 'pre',
        include: path.resolve(ROOT_PATH, './app')
      },
      {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.module\.scss$/,
        loader: 'style-loader!css-loader' +
        '?modules&importLoaders=1&localIdentName=[path]' +
        '___[name]__[local]___[hash:base64:5]' +
        '!resolve-url-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.scss$/,
        exclude: [/\.module\.scss$/],
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.join(ROOT_PATH, 'node_modules')
                ],
                outputStyle: 'compressed'
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: Object.assign(
                {},
                {
                  plugins: [
                    rucksack(),
                    autoprefixer({
                      browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 9',
                        'iOS >= 8',
                        'Android >= 4',
                      ],
                    }),
                  ],
                },
                {sourceMap: false}
              ),
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /font.*\.(ttf|eot|svg|woff)$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.(jpg|png|svg|pdf)$/,
        exclude: /font.*\.svg$/,
        loader: 'file-loader?name=[path][name].[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    alias: {
      components: path.resolve(ROOT_PATH, 'app/src/components'),
      containers: path.resolve(ROOT_PATH, 'app/src/containers'),
      actions: path.resolve(ROOT_PATH, 'app/src/actions'),
      constants: path.resolve(ROOT_PATH, 'app/src/constants'),
      utils: path.resolve(ROOT_PATH, 'app/src/utils'),
      assets: path.resolve(ROOT_PATH, 'app/assets'),
      styles: path.resolve(ROOT_PATH, 'app/styles')
    },
    modules: [
      path.join(__dirname, 'src'), 'node_modules'
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlwebpackPlugin({
      title: 'React Bucket',
      template: 'app/index.html',
      chunks: ['vendor', 'main']
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    proxy: {
      "^/api/**": {
        target: process.env.TARGET || 'http://example.com:80',
        changeOrigin: true,
      }
    },
    contentBase: path.join(__dirname, 'app/build'),
    stats: "errors-only"
  },
}
