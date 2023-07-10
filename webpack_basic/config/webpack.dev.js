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
// 引入preload-webpack-plugin插件
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
// 引入workbox-webpack-plugin插件
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

// 获取当前计算机总进程数
const cpus = os.cpus().length

module.exports = {
    // 单入口入口配置
    entry: './src/index.js',
    // 多入口入口配置
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
        chunkFilename: 'js/[name].chunk.js'
    },
    // 模块配置
    module: {
        // 规则
        rules: [
            {
                // oneOf表示只使用一个加载器, 提高效率, 但是不能有两个加载器处理同一种类型的文件, 否则会报错
                oneOf: [
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
            threads: cpus - 1,
            // 排除node_modules
            exclude: 'node_modules'
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
        // 配置代码分割
        splitChunks: {
            // 配置分割规则
            chunks: 'all'
        },
        // 配置将当前模块的记录其他模块的hash单独打包为一个文件
        runtimeChunk: 'single'
    },
    // 开发服务器配置
    devServer: {
        // 服务器根目录
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        // historyApiFallback: true表示任意的404响应都可能需要被替代为index.html
        historyApiFallback: true,
        // 开启gzip压缩
        compress: true,
        // 服务器启动域名，配置为0，0，0，0相同局域网内所有人都可以通过你的当前ip访问你的服务
        host: '0.0.0.0',
        // 端口号
        port: 8000,
        // 开启HMR功能, 作用是局部更新，不会刷新整个页面，提升开发效率
        hot: true,
        // 配置headers
        // headers: {
        //     'X-Access-Token': 'harbour-bro2'
        // },
        // 配置代理
        // proxy: {
        //     // 当请求路径以/api开头时，开发服务器会代理转发请求到目标服务器
        //     '/api': {
        //         // 目标服务器地址
        //         target: 'http://localhost:3000',
        //         // 开启代理服务器
        //         changeOrigin: true,
        //         // 重写路径
        //         pathRewrite: {
        //             '^/api': '/app'
        //         },
        //         // 禁用对目标服务器的安全验证
        //         secure: false
        //     }
        // },
        // 配置是否自动打开浏览器
        open: false
    },
    // 开启source-map
    devtool: 'eval-cheap-module-source-map',
    // 模式
    mode: 'development'
}