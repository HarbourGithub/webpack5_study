const path = require('path')
const os = require('os')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        filename: 'js/[name].js',
        // 开发模式下，输出目录为内存中的虚拟目录
        path: undefined
    },
    // 加载器配置
    module: {
        rules: [
            {
                // oneOf表示只使用一个加载器, 提高效率, 但是不能有两个加载器处理同一种类型的文件, 否则会报错
                oneOf: [
                    // 配置css，less加载器
                    {
                        test: /\.(css|less)$/,
                        use: [
                            // 提取css到单独文件
                            MiniCssExtractPlugin.loader,
                            // css加载器, postcss加载器, less加载器, 从右到左执行, 从下到上执行
                            'css-loader',
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
                            filename: 'img/[hash:10][ext][query]'
                        }
                    },
                    // 配置字体图标加载器，包括其他媒体资源
                    {
                        test: /\.(woff2?|eot|ttf|otf|map3|map4|avi)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: 'media/[hash:10][ext][query]'
                        }
                    },
                    // 配置babel加载器
                    {
                        test: /\.js$/,
                        // 排除node_modules目录下的文件
                        exclude: /node_modules/,
                        use: [
                            // 开启多进程打包，提升打包速度
                            {
                                loader: 'thread-loader',
                                options: {
                                    workers: threadLength - 1
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    // 预设
                                    presets: ['@babel/preset-env'],
                                    // 开启babel缓存，有缺点，慎重开启
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
            // eslint检查的文件
            context: path.resolve(__dirname, '../src'),
            // 开启缓存，只检查修改过的文件，提升效率，有缺点，慎重开启
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
            filename: 'css/[name].css'
        })
    ],
    // 优化配置
    optimization: {
        // 开启代码分割
        splitChunks: {
            chunks: 'all'
        }
    },
    // 开发服务器配置
    devServer: {
        // 服务器启动域名
        host: '127.0.0.1',
        // 端口号
        port: 3001,
        // 开启HMR功能, 作用是局部更新，不会刷新整个页面，提升开发效率，不会影响生产环境，
        // 只在开发环境使用，生产环境还是会刷新整个页面，重新加载所有资源，HMR只能处理非入口js文件的其他文件
        hot: true
    },
    // 开发模式
    mode: 'development',
    // 开发工具
    devtool: 'cheap-module-source-map'
}