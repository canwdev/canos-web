const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    // 启用代码压缩(将增加打包时间)
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // 不要开启，会有bug
          compress: false,
          format: {
            comments: false, // 删除注释
          },
        },
        extractComments: false, // 不将注释提取到单独的文件中
      }),
    ],
  },
}
