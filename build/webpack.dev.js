const webpackBase = require("./webpack.base");
const {merge} = require('webpack-merge')
const {resolve} = require('path')

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map', // 在大多数情况下，最佳选择是 eval-cheap-module-source-map。
    devServer:{
        port: 3333,
        open: false,
        hot: true, // 热更新HRM
    }
})