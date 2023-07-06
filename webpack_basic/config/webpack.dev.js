const baseConfig = require('./webpack.base.js')

// 生成基础的webpack5配置
module.exports = {
    // 合并基础配置
    ...baseConfig,
    // 出口配置
    output: {
        filename: 'js/bundle.js',
        // 开发模式下，输出目录为内存中的虚拟目录
        path: undefined
    },
    // 开发服务器配置
    devServer: {
        // 服务器启动域名
        host: '127.0.0.1',
        // 端口号
        port: 3000,
        // 开启HMR功能
        hot: true
    },
    // 开发模式
    mode: 'development',
    // 开发工具
    devtool: 'cheap-module-source-map'
}