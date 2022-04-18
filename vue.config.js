const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/': {
        target: 'http://192.168.3.16:3000',
        ws: false,
        changeOrigin: true
      }
    }
  }
})
