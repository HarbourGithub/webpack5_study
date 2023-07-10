// 引入path模块
const path = require('path')
// 引入os模块
const os = require('os')
// 引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入mini-css-extract-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入eslint-webpack-plugin插件
const EslintWebpackPlugin = require('eslint-webpack-plugin')
// 引入css-minimizer-webpack-plugin插件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// 引入terser-webpack-plugin插件
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 引入preload-webpack-plugin插件
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
// 引入workbox-webpack-plugin插件
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

// 获取当前计算机总进程数
const cpus = os.cpus().length

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
        // 非入口chunk的名称
        chunkFilename: 'js/[name].chunk.js',
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
                    // 开启多进程打包
                    {
                        loader: 'thread-loader',
                        options: {
                            // 进程数
                            workers: cpus - 1
                        }
                    },
                    {
                        // 使用babel-loader
                        loader: 'babel-loader',
                        // 配置babel
                        options: {
                            // 预设
                            presets: [[
                                // 预设包含了ES6、7、8的语法转换规则
                                '@babel/preset-env',
                                // 按需加载，自动引入
                                {
                                    useBuiltIns: 'usage',
                                    corejs: '3.31.1'
                                }
                            ]],
                            // 开启缓存
                            cacheDirectory: true,
                            // 关闭缓存压缩
                            cacheCompression: false,
                            // 配置禁用了 Babel 自动对每个文件的 runtime 注入，
                            // 而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用，来避免重复引入
                            plugins: ['@babel/plugin-transform-runtime']
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
            context: path.resolve(__dirname, '../src'),
            // 开启缓存
            cache: true,
            // 开启多进程打包，设置进程数
            threads: cpus - 1
        }),
        // 预加载插件
        new PreloadWebpackPlugin({
            // 预加载的资源
            rel: 'preload',
            // 仅处理js文件
            as: 'script'
        }),
        // workbox插件
        // new WorkboxWebpackPlugin.GenerateSW({
        //     // 不需要手动配置service-worker.js文件，会自动生成
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
    ],
    // 优化配置
    optimization: {
        // 配置压缩插件
        minimizer: [
            // 配置css压缩插件
            new CssMinimizerWebpackPlugin(),
            // 配置terser压缩插件, 用于压缩js, 默认是terser-webpack-plugin, 
            // 但是webpack5中已经内置了, 如果不需要开启多进程打包, 可以不用配置
            new TerserWebpackPlugin({
                // 开启多进程
                parallel: cpus - 1
            })
        ],
        // 配置代码分割
        splitChunks: {
            // 配置分割规则
            chunks: 'all'
        }
    },
    // 模式
    mode: 'production'
}