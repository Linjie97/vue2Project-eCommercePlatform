const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
 
  lintOnSave:false,//关闭eslint语法检查

  devServer:{
    host:'127.0.0.1',
    port:8080,
    open:true,
    // proxy:'http://gmall-h5-api.atguigu.cn',
    proxy:{
      'api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''}
      }
    }
  }
})

// module.exports={
//   lintOnSave:false,//关闭eslint语法检查
// }
