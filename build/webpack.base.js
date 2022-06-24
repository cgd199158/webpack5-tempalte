const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const { resolve } = require('path')
const config = require('./config.js')

module.exports = {
    entry: resolve(__dirname, '../src/main.js'),
    output: {
        clean: true,
        path: resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:6].js',
        chunkFilename: 'js/chunck.[name].[hash:6].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '..', 'src')
        },
        modules: ['node_modules','*'],
        extensions: ['.ts', '.js', '.vue']
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/, // 对成熟的库不做解析
        rules: [
            // 处理ts
            // {
            //     test: /\.ts$/,
            //     include: resolve(__dirname, '../src'),
            //     loader: 'ts-loader',
            // },
            {
                test: /\.js$/,
                // type: 'javascript/auto',
                // include: resolve(__dirname, '../src'),
                // loader: 'babel-loader' // loader是use: [{loader}]的简写
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader'] // loader从右向左执行（柯里化）
            },
            {
                test: /\.(jpg|png|svg|jpeg|gif)$/i,
                type: 'asset/resource', // file-loader导出文件
                generator: {
                    filename: 'imgs/[name].[hash:6].[ext]'
                }
                // type: 'asset/source', // raw-loader导出源文件到路径当中
                // type: 'asset/inline', // 直接转换base64到路径当中
                // 只使用第一个匹配的规则，从上至下
                // oneOf: [
                //     {
                //         resourceQuery: /inline/, // foo.css?inline
                //         use: 'url-loader',
                //     },
                //     {
                //         resourceQuery: /external/, // foo.css?external
                //         use: 'file-loader',
                //     },
                // ],
            },
            {
				test: /\.vue$/,
				loader: 'vue-loader',
			},
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            title: 'webpack5-template',
            template: resolve('public', 'index.html'),
        }),
        // shimming 全局变量
        new webpack.ProvidePlugin({
            _: 'lodash',
            cloneDeep: ['lodash', 'cloneDeep'], // 通过数组路径将模块中的单个模块暴露再全局
        }),
    ],
}