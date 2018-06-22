const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  plugins: [HtmlWebpackPluginConfig],
  module: {
    loaders: [
      {test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/,query: {presets:['es2015', 'react']}},
      {test: /\.scss?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.css?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(jpe?g|gif|png|eot|svg|woff|woff2|ttf)$/, loader: 'file-loader'}
    ]
  }
};
