const path = require('path')
const os = require('os')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const terserWebpackPlugin = require('terser-webpack-plugin')

const threadLength = os.cpus().length

// 生成基础的webpack5配置
module.exports = {
    // 入口配置
    entry: './src/index.js',
    // 多入口配置
    // entry: {
    //     index: './src/index.js',
    //     app: './src/app.js'
    // },
    // 出口配置
    output: {
        // 输出文件名
        filename: 'js/[name].js',
        // 输出的按需加载的文件的文件名
        chunkFilename: 'js/[name].chunk.js',
        // 通过type: asset输出的文件的文件名
        // assetModuleFilename: 'img/[hash:10][ext][query]',
        // 输出目录
        path: path.resolve(__dirname, '../dist'),
        // 清空输出目录
        clean: true
    },
    // 加载器配置
    module: {
        rules: [
            // 配置css，less加载器
            {
                // oneOf表示只使用一个加载器, 提高效率, 但是不能有两个加载器处理同一种类型的文件, 否则会报错
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        use: [
                            // 提取css到单独文件
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            // postcss加载器, 使用postcss-preset-env插件, 兼容性配置在package.json中的browserslist中
                            {
                                loader: 'postcss-loader',
                                options: {
                                    // postcss插件
                                    postcssOptions: {
                                        plugins: ['postcss-preset-env']
                                    }
                                }
                            },
                            'less-loader'
                        ]
                    },
                    // 配置图片加载器, 小于8kb的图片转换成base64
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 8 * 1024
                            }
                        },
                        generator: {
                            filename: 'asset/[hash:10][ext][query]'
                        }
                    },
                    // 配置字体图标加载器，包括其他媒体资源
                    {
                        test: /\.(woff2?|eot|ttf|otf|map3|map4|avi)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: 'asset/[hash:10][ext][query]'
                        }
                    },
                    // 配置babel加载器
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            // 开启多进程打包
                            {
                                loader: 'thread-loader',
                                options: {
                                    // 进程, 默认是cpu核心数-1, 也可以手动设置
                                    workers: threadLength - 1
                                }
                            },
                            // 开启babel-loader, 用于将es6转换成es5
                            {
                                loader: 'babel-loader',
                                options: {
                                    // 预设
                                    presets: ['@babel/preset-env'],
                                    // 开启babel缓存
                                    cacheDirectory: true,
                                    // 关闭babel缓存压缩
                                    cacheCompression: false,
                                    // 配置禁用了 Babel 自动对每个文件的 runtime 注入，
                                    // 而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用，来避免重复引入
                                    plugins: ['@babel/plugin-transform-runtime']
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // 插件配置
    plugins: [
        // 配置eslint插件
        new ESLintPlugin({
            // eslint检查的文件, 只检查src目录下的文件
            context: path.resolve(__dirname, '../src'),
            // 开启缓存
            cache: true,
            // 缓存目录, 默认是node_modules/.cache/eslint-webpack-plugin/.eslintcache, 可以自定义
            // cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
            // 多进程打包, 默认是cpu核心数-1, 也可以手动设置
            threads: threadLength - 1
        }),
        // 配置html插件
        new HtmlWebpackPlugin({
            // 模板文件
            template: path.resolve(__dirname, '../public/index.html'),
            // 输出文件名
            filename: 'index.html'
        }),
        // 配置css提取插件
        new MiniCssExtractPlugin({
            // [name]是文件名，webpack的命名方式，默认是main
            filename: 'style/[name].css'
        })
    ],
    // 优化配置, 用于压缩css和js, 也可以在plugins中配置, 但是在plugins中配置的话, 会覆盖默认的配置, 所以这里使用optimization配置
    optimization: {
        // 配置压缩插件
        minimizer: [
            // 配置css压缩插件
            new CssMinimizerPlugin(),
            // 配置terser压缩插件, 用于压缩js, 默认是terser-webpack-plugin, 但是webpack5中已经内置了, 如果不需要开启多进程打包, 可以不用配置
            new terserWebpackPlugin({
                // 开启多进程打包
                parallel: threadLength - 1
            })
        ],
        // 配置代码分割
        splitChunks: {
            chunks: 'all'
        }
    },
    // 生产模式
    mode: 'production'
}