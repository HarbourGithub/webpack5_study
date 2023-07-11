const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    cache: false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash:10].js',
        chunkFilename: 'js/[name].[contenthash:10].chunk.js',
        clean: true
    },
    module: {
        rules: [
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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react-app'],
                            cacheDirectory: false,
                            cacheCompression: false
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash:10].css'
        }),
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            cache: false,
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ],
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single'
    },
    mode: 'production'
}