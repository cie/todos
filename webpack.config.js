const webpack = require('webpack')
const path = require('path')
const meteorExternals = require('webpack-meteor-externals')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const clientConfig = {
  target: 'web',
  entry: './client/main.js',
  devtool: 'inline-source-map',
  devServer: {
    hot: true
  },
  output: {
    publicPath: '/'
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [{ loader: 'svelte-loader' }]
      },
      { test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' }
    ]
  },
  externals: [meteorExternals()],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      hash: true
    })
  ]
}

const serverConfig = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [meteorExternals(), nodeExternals()], // in order to ignore all modules in node_modules folder
  entry: './server/main.js',
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [{ loader: 'svelte-loader' }]
      },
      { test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' }
    ]
  },
  devServer: {
    hot: true
  }
}

module.exports = [clientConfig, serverConfig]
