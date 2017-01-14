var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: ['', '.js']
  },

  entry: {
    app: './index.js',
    vendor: [
      "xstream",
      "@cycle/xstream-run",
      "@cycle/dom"
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css'
    ]
  },

  output: {
    path: path.join(basePath, "dist"),
    filename: '[name].js'
  },

  devServer: {
    contentBase: './dist', //Content base
    inline: true, //Enable watch and live reload
    host: 'localhost',
    port: 8080,
    noInfo: true
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      //Note: Doesn't exclude node_modules to load bootstrap
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css')
      },
      //Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}
