/* eslint-disable @typescript-eslint/no-require-imports */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const webpackBase = require('./webpack.base');
const chalk = require('chalk');
const { merge } = require('webpack-merge');
const config = require('./config');
const path = require('path');

module.exports = merge(webpackBase, {
  mode: 'development',
  devtool: 'source-map', // 生产环境中无其他特殊情况用source-map //避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能
  output: {
    pathinfo: false,
    publicPath: config.publicPath,
    // 只有在打包库得时候会用到
    // library: {
    //     name: 'webpackNumbers', // 库的名称
    //     type: 'umd', // 支持esmodule, commomjs, AMD, script tag
    // },
  },
  stats: 'verbose', // 全部输出
  // recordsPath: path.join(__dirname, '../dist/records.json'), // 用于记录依赖的文件
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: 6,
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new CssMinimizerWebpackPlugin(),
    ],
    // runtimeChunk: 'single',
    // runtimeChunk: { name: 'runtime' },
    // webpack4之前用的webpack.optimize.CommonsChunkPlugin抽离公共代码
    splitChunks: {
      chunks: 'all', // all:所有模块都提取公共代码，async:异步模块提取公共代码，initial:同步模块提取公共代码
      minSize: 20000, // 模块大于20k会被抽离到公共chunk中
      minRemainingSize: 0, // 当模块大于这个值时，会被抽离到公共chunk中
      minChunks: 1, // 公共chunk最小模块数
      maxAsyncRequests: 30, // 异步chunk最大并行请求数
      maxInitialRequests: 30, // 入口chunk最大并行请求数
      enforceSizeThreshold: 50000, // 当模块大于这个值时，会被抽离到公共chunk中
      hidePathInfo: true, // 当抽离的chunk不是入口chunk时，隐藏抽离的模块路径
      cacheGroups: {
        // 默认的公共代码抽离
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
          reuseExistingChunk: true, // 如果当前的chunk已经被抽离，则使用已经存在的chunk
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    // 将css单独抽离打包并压缩
    new MiniCssExtractPlugin({
      // 与 webpackOptions.output 中的选项相似
      // 所有的选项都是可选的
      filename: `css/[name].[hash:6].css`,
      chunkFilename: `css/build.[name].[hash6].css`,
    }),
    // 匹配runtime文件并写入到html中,减少请求的同时能充分利用浏览器缓存
    // new ScriptExtHtmlWebpackPlugin({
    //     inline: /runtime.*?\.js$/  //正则匹配runtime文件名
    // }),
    new ProgressBarWebpackPlugin({
      format: chalk.blueBright(' build :bar :percent (:elapsed seconds) '),
      clear: false,
      summary: false,
      customSummary: (res) => {
        process.stderr.write(chalk.blueBright.bold(` build success use time ${res} \n`));
      },
    }),
  ],
});
