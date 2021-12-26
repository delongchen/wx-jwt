const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { AddPkgPlugin } = require('./add-pkg-plugin')

const copyFromSrc = path => {
  const outPath = `src/${path}`
  return { from: outPath, to: outPath }
}

const webpackConfig = {
  entry: './src/index.ts',
  mode: "production",
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin,
    new AddPkgPlugin,
    new CopyWebpackPlugin({
      patterns: [
        copyFromSrc('config/config.yml')
      ]
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist')
  }
}

module.exports = webpackConfig
