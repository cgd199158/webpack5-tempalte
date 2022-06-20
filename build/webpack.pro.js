const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const webpackBase = require("./webpack.base");
const { merge } = require("webpack-merge")

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'source-map', // 生产环境中无其他特殊情况用source-map //避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能
    output: {
        pathinfo: false
        // 只有在打包库得时候会用到
        // library: {
        //     name: 'webpackNumbers', // 库的名称
        //     type: 'umd', // 支持esmodule, commomjs, AMD, script tag
        // },
    },
    optimization: {
        runtimeChunk: 'single',
        // splitChunks: {
        //     chunks: 'async',
        //     minSize: 20000,
        //     minRemainingSize: 0,
        //     minChunks: 1,
        //     maxAsyncRequests: 30,
        //     maxInitialRequests: 30,
        //     enforceSizeThreshold: 50000,
        //     cacheGroups: {
        //         defaultVendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10,
        //             reuseExistingChunk: true,
        //         },
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true,
        //         },
        //     }, 
        // }
    },
    plugins: [
        // 匹配runtime文件并写入到html中,减少请求的同时能充分利用浏览器缓存
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime.*?\.js$/  //正则匹配runtime文件名
        })
    ]
})