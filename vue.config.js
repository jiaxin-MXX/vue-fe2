const path=require('path')
module.exports={
    chainWebpack:config=>{
        config.resolve.alias
            .set('components',path.resolve(__dirname,'./src/components'))
            .set('views',path.resolve(__dirname,'./src/views'))
            .set('assets',path.resolve(__dirname,'./src/assets'))
            .set('utils',path.resolve(__dirname,'./src/utils'))
    },
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:4000',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
          },
        }
      }
}