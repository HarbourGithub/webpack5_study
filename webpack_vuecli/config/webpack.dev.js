const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: ['postcss-preset-env']
                                    }
                                }
                            },
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg|ico)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 8 * 1024
                            }
                        },
                        generator: {
                            filename: 'image/[name].[hash:8][ext]'
                        }
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf|mp3|mp4|avi|mkv)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: 'media/[name].[hash:8][ext]'
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [[
                                        '@babel/preset-env',
                                        {
                                            useBuiltIns: 'usage',
                                            corejs: '3.31.1'
                                        }
                                    ]],
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                    plugins: ['@babel/plugin-transform-runtime']
                                }
                            }
                        ]
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].css'
        }),
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            cache: true
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        historyApiFallback: true,
        compress: true,
        host: '0.0.0.0',
        port: 8000,
        hot: true,
        open: false
    },
    devtool: 'eval-cheap-module-source-map',
    mode: 'development'
}