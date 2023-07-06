const path = require('path')
const baseConfig = require('./webpack.base.js')

// 生成基础的webpack5配置
module.exports = {
    // 合并基础配置
    ...baseConfig,
    // 出口配置
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    // 开发模式
    mode: 'production',
    // 开发工具
    devtool: 'false'
}