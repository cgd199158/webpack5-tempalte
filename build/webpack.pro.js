const webpackBase = require("./webpack.base");
const {merge}  =  require("webpack-merge")

module.exports = merge(webpackBase, {
    mode: 'production'
})