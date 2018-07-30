const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }
  
// const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    // devtool:'null',
    devtool: 'source-map',
    target: 'node',
    mode:'development',
    // optimization: {
    //     splitChunks: {
    //         chunks: 'async',
    //         minSize: 30000,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: '~',
    //         cacheGroups: {
    //             vendors: {
    //             test: /[\\/]node_modules[\\/]/,
    //             priority: -10
    //             },
    //             default: {
    //             minChunks: 2,
    //             priority: -20,
    //             reuseExistingChunk: true
    //             }
    //         },
    //         name: 'vendor',
    //         minChunks: function (module) {
    //             // 一个模块被提取到 vendor chunk 时……
    //             return (
    //             // 如果它在 node_modules 中
    //             /node_modules/.test(module.context) &&
    //             // 如果 request 是一个 CSS 文件，则无需外置化提取
    //             !/\.css$/.test(module.request)
    //             )
    //         }
    //     },
    // },
    entry:{
        path: __dirname + "/app/server_entry.js"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        libraryTarget: 'commonjs2',
        filename: 'server-bundle.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('app'),
        }
      },
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/
      }),
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // enable CSS extraction
                    extractCSS: true
                  }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/
                // include: [resolve('src'), resolve('test')]
            },
            {  
                test: /\.css$/,                  
                // 将样式抽取出来为独立的文件
                use: ['vue-style-loader', 'css-loader']
                //  use: ExtractTextPlugin.extract({
                //     use: 'css-loader',
                //     fallback: 'vue-style-loader'
                //   }),
                // exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
            
        ]
    },
    resolve: { 
        // alias: { 
        //     'vue': 'vue/dist/vue.js' 
        // } 
    },
    devServer: {
        // contentBase:'./public',
        // historyApiFallback:true,
        // inline:true,
        // port:3000
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vender',
        //     minChunks: 2
        //   }),
        // new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
          }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // }),
        new VueSSRServerPlugin(),
        new VueLoaderPlugin(),
        // new ExtractTextPlugin("[name].[contenthash].css"),    
    ]

}
