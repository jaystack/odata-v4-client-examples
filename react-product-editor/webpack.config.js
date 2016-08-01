var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '.');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'app.bundle.js',
    sourceMapFilename: 'app.bundle.map'
  },
  devtool: 'inline-source-map',
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader'
      }
    ]
  }
};

module.exports = config;