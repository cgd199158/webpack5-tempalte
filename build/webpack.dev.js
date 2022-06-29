/* eslint-disable @typescript-eslint/no-require-imports */
const webpackBase = require('./webpack.base');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const { merge } = require('webpack-merge');
const config = require('./config.js');

module.exports = merge(webpackBase, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 在大多数情况下，最佳选择是 eval-cheap-module-source-map。
  devServer: {
    port: config.port,
    open: false,
    hot: true, // 热更新HRM
  },
  // 用于基础设施水平的日志选项。
  // infrastructureLogging: {
  //   colors: true,
  //   level: 'none',
  // },
  // // 是否显示编译信息
  stats: 'summary',
  plugins: [
    // 友好错误信息提示
    // new FriendlyErrorsWebpackPlugin({
    //   compilationSuccessInfo: {
    //     messages: [
    //       chalk.blueBright.bold('Your application is running here: ') +
    //         chalk.greenBright.bold(`http://${config.devServer}:${config.port}/`),
    //       chalk.blueBright.bold('Your application is running here: ') +
    //         chalk.greenBright.bold(`http://localhost:${config.port}/`),
    //     ],
    //   },
    // }),
    // 进度条提示
    new ProgressBarWebpackPlugin({
      format: chalk.blueBright(`${config.title} :bar :percent (:elapsed seconds) `),
      clear: true,
      summary: false,
      customSummary: () => {
        process.stderr.write(chalk.blueBright('   '));
      },
    }),
  ],
});
