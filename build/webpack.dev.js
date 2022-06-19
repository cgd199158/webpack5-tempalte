const webpackBase = require("./webpack.base");
const {merge} = require('webpack-merge')
const {resolve} = require('path')

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'eval-source-map',

    output: {
        path: resolve(__dirname, 'dist'),
    },
})