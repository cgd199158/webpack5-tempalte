const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')

const DEVELOPMENT = process.env.NODE_ENV === 'development'; // Development mode
const PRODUCTION = process.env.NODE_ENV === 'production'; // Production mode

module.exports = {
    entry: resolve(__dirname, '../main.js'),
    output: {
        filename: DEVELOPMENT
            ? 'js/[name].bundle.[chunkhash:4].js'
            : 'js/[name].bundle.[chunkhash:8].min.js',
        chunkFilename: DEVELOPMENT
            ? 'js/[name].chunk.[chunkhash:4].js'
            : 'js/[name].chunk.[chunkhash:8].min.js',
        publicPath: '/'
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: false
        }),
        new htmlWebpackPlugin({
            template: resolve('public', 'index.html'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                type: 'javascript/auto',
                // loader: 'babel-loader' // loader是use: [{loader}]的简写
                use: ['babel-loader']
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.(jpg|png|svg|jpeg|gif)$/i,
                // type: 'asset/resource', // file-loader导出文件
                // type: 'asset/source', // raw-loader导出源文件到路径当中
                type: 'asset/inline', // 直接转换base64到路径当中
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
            }
        ]
    }
}