const webpack = require("webpack")
const path = require("path")
// const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueSSRclientPlugin = require('vue-server-renderer/client-plugin')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }
  
module.exports = {
    // devtool:'null',
    // devtool: 'source-map',
    target: 'web',
    mode:'development',
    entry:{
        path: __dirname + "/app/client_entry.js"
    },
    output: {
        // publicPath:'/',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        // path: __dirname + "/dist",
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('app'),
        }
      },
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
                // use: ExtractTextPlugin.extract({
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
        alias: { 
            'vue': 'vue/dist/vue.js' 
        } 
    },
    devServer: {
        contentBase:'./public',
        historyApiFallback:true,
        inline:true,
        port:3000
    },
    plugins: [
        // new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
          }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function (module) {
        //       // a module is extracted into the vendor chunk if...
        //       return (
        //         // it's inside node_modules
        //         /node_modules/.test(module.context) &&
        //         // and not a CSS file (due to extract-text-webpack-plugin limitation)
        //         !/\.css$/.test(module.request)
        //       )
        //     }
        // }),
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // }),
        new VueSSRclientPlugin(),
        new VueLoaderPlugin(),
        // new ExtractTextPlugin("[name].[contenthash].css"),    
    ]

}
