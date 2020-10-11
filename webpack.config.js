'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/ts/main.ts',
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
  },
  devtool: 'source-map',
  plugins: [
  ],
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HTMLWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};
