//declare声明宣告， 声明一个ambient module(即:没有内部实现的 module声明) 
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
  }
   
   
  declare module 'swiper';
  // declare module 'qrcode';
  // xx即你包不能找到声明的包名

//   有的npm包使用原生js没问题，换ts后某些包会报“Could not find a declaration file for module”的错误。
// 有以下两种方式解决
// 1、下载 @type/报错包（部分包开发者可能没有上传自己的.d.ts代码到npm分支，这时会报错说找不到这个包，别急看下一步）
// 2、最直接简单有效的解决方法：项目根目录下新建shims-vue.d.ts文件