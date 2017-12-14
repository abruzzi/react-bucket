const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const autoprefixer = require('autoprefixer')
const rucksack = require('rucksack-css')
const precss = require('precss')
const ManifestPlugin = require('webpack-manifest-plugin')

const ROOT_PATH = path.resolve(__dirname)

module.exports = {
  devtool: 'none',
  entry: {
    'ie.shim': './app/src/polyfills/ie-shim',
    main: [
      path.resolve(ROOT_PATH, 'app/src/index')
    ],
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
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      },
      // {
      //   test: /\.svg$/,
      //   use: ['babel-loader','svg-react-loader']
      // },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(sass|sss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precess'),
                  require('autoprefixer'),
                  autoprefixer({browsers: []})
                ]
              }
            }
          },
          'sass-loader'
        ]
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
                sourceMap: false,
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
                sourceMap: false,
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
  output: {
    path: path.resolve(ROOT_PATH, 'dist/public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  stats: {
    chunks: true,
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/'
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },
      safeToUseOptionalCaches: true,
      AppCache: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new HtmlwebpackPlugin({
      title: 'React Bucket',
      template: 'app/index.html',
      chunks: ['vendor', 'main', 'ie.shim'],
      chunksSortMode: function (a, b) {
        var aName = a.names[0]
        var bName = b.names[0]
        // main is last
        if (aName === 'main') {
          return 1
        } else if (bName === 'main') {
          return -1
        }
        // ie.shim is first
        if (aName === 'ie.shim') {
          return -1
        } else if (bName === 'ie.shim') {
          return 1
        }

        return 0
      }
    })
  ]
}
