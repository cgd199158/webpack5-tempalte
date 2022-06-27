const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { resolve } = require('path');
const config = require('./config.js');

module.exports = {
  entry: resolve(__dirname, '../src/main.js'),
  output: {
    clean: true,
    path: resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/chunck.[name].[hash:6].js',
    publicPath: config.publicPath,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '..', 'src'),
    },
    modules: ['node_modules', '*'],
    extensions: ['.ts', '.js', '.vue'],
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
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          config.isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: config.isProd,
              importLoaders: 1,
              esModule: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: config.isProd,
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
        ], // loader从右向左执行（柯里化）
      },
      {
        test: /\.scss$/,
        use: [
          // 生产版本，我们建议从 bundle 中提取 CSS，以便之后可以使 CSS/JS 资源并行加载
          config.isPord ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: config.isPord,
              esModule: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: config.isPord,
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: config.isPord,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset/resource', // file-loader导出文件
        generator: {
          filename: 'imgs/[name].[hash:6].[ext]',
        },
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
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理字体
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // 定义变量
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: config.isPord,
    }),
    // 定义NODE_ENV
    new webpack.DefinePlugin({
      'process.env': {
        NODE_EVN: config.isPord ? 'production' : 'development',
      },
    }),
    // shimming 全局变量
    new webpack.ProvidePlugin({
      _: 'lodash',
      cloneDeep: ['lodash', 'cloneDeep'], // 通过数组路径将模块中的单个模块暴露再全局
    }),
    new HtmlWebpackPlugin({
      title: config.title,
      template: resolve(__dirname, '/public/index.html'),
      hash: true, // 破坏缓存
    }),
  ],
};
