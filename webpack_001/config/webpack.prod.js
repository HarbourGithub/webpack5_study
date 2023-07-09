// 引入path模块
const path = require('path')
// 引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入mini-css-extract-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入eslint-webpack-plugin插件
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
    // 单入口配置
    entry: './src/index.js',
    // 多入口入口配置，index和app是自定义的名称
    // entry: {
    //     index: './src/index.js',
    //     app: './src/app.js'
    // },
    // 出口配置
    output: {
        // 输出路径
        path: path.resolve(__dirname, '../dist'),
        // 输出文件名
        filename: 'js/[name].js',
        // 清空输出目录
        clean: true
    },
    // 模块配置
    module: {
        // 规则
        rules: [
            // 处理css，less文件
            {
                // 匹配文件
                test: /\.(css|less)$/,
                // 使用的loader
                use: [
                    // 将css提取为单独的文件
                    MiniCssExtractPlugin.loader,
                    // 将css转换为js
                    'css-loader',
                    // 使用postcss-loader
                    {
                        loader: 'postcss-loader',
                        // 配置postcss
                        options: {
                            // 使用插件
                            postcssOptions: {
                                // 使用预设包
                                plugins: ['postcss-preset-env']
                            }
                        }
                    },
                    // 将less转换为css
                    'less-loader'
                ]
            },
            // 处理图片，小于8kb的图片转为base64格式
            {
                test: /\.(png|jpe?g|gif|webp|svg|ico)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                // 生成文件名
                generator: {
                    filename: 'image/[name].[hash:8][ext]'
                }
            },
            // 处理字体文件及其他媒体文件
            {
                test: /\.(woff2?|eot|ttf|otf|mp3|mp4|avi|mkv)$/,
                type: 'asset/resource',
                // 生成文件名
                generator: {
                    filename: 'media/[name].[hash:8][ext]'
                }
            },
            // 配置babel，将ES6+转换为ES5
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        // 使用babel-loader
                        loader: 'babel-loader',
                        // 配置babel
                        options: {
                            // 预设
                            presets: [
                                // 预设包含了ES6、7、8的语法转换规则
                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            },
            // 处理html中的资源引用
            {
                test: /\.html$/,
                // 使用html-loader
                loader: 'html-loader'
            }
        ]
    },
    // 配置插件
    plugins: [
        // 生成html文件插件
        new HtmlWebpackPlugin({
            // 模板文件
            template: path.resolve(__dirname, '../public/index.html'),
            // 输出文件名
            filename: 'index.html',
        }),
        // 提取css文件插件
        new MiniCssExtractPlugin({
            // 输出文件名
            filename: 'style/[name].css'
        }),
        // eslint插件
        new EslintWebpackPlugin({
            // eslint检查的文件, 只检查src目录下的文件
            context: path.resolve(__dirname, '../src')
        })
    ],
    // 模式
    mode: 'production'
}