const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 生成基础的webpack5配置
module.exports = {
    // 入口配置
    entry: './src/index.js',
    // 出口配置
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    // 加载器配置
    module: {
        rules: [
            // 配置css，less加载器
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // 配置图片加载器, 小于20kb的图片转换成base64
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024
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
                    filename: 'font/[hash:10][ext][query]'
                }
            },
            // 配置babel加载器
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        // 配置eslint插件
        new ESLintPlugin({
            // eslint检查的文件
            context: path.resolve(__dirname, '../src')
        }),
        // 配置html插件
        new HtmlWebpackPlugin({
            // 模板文件
            template: path.resolve(__dirname, '../public/index.html'),
            // 输出文件名
            filename: 'index.html'
        })
    ],
    // 开发模式
    mode: 'production'
}