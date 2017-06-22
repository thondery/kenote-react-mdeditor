// ------------------------------------
// Webpack Config For Version 2.x
// ------------------------------------
const webpack = require('webpack')
const path = require('path')
const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')

const isProd = process.env.NODE_ENV === 'production'
const scssLoader = [
  {
    loader: 'css-loader?minimize',
    options: {
      sourcemap: true,
      modules: true
    }
  },
  {
    loader: 'postcss-loader',
    options: 
      cssnano({
        autoprefixer : {
          add      : true,
          remove   : true,
          browsers : ['last 2 versions']
        },
        discardComments : {
          removeAll : true
        },
        discardUnused : false,
        mergeIdents   : false,
        reduceIdents  : false,
        safe          : true,
        sourcemap     : true
      })
  },
  {
    loader: 'sass-loader',
    options: {
      sourcemap: true
    }
  }
]

module.exports = {
  context: __dirname + '/src',
  entry: {
    index: './index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash].bundle.js',
    publicPath: ''
  },
  plugins: _.compact([
    isProd && new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),
    isProd && new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    }),
    new HtmlWebpackPlugin({
      template : __dirname + '/src/index.html',
      hash     : false,
      favicon  : __dirname + '/public/favicon.ico',
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : false
      }
    })
  ]),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: { 
            presets: ['es2015', 'react', 'stage-0'] ,
            plugins: [
              'transform-decorators-legacy'
            ]
          }
        }],
      },
      {
        test : /\.json$/,
        use : [
          'json-loader'
        ]
      },
      {
        test: /\.css$/,
        use: isProd ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&-minimize'
        }) : [
          'style-loader',
          'css-loader?sourceMap&-minimize'
        ]
      },
      {
        test: /\.scss$/,
        use: isProd ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: scssLoader,
        }) : scssLoader,
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]?[hash]'
        }
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
      }
    ],
  },
}
