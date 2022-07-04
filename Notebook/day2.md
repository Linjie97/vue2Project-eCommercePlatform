1:编程式路由（push|repalce）跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
--声明式导航不会有这类问题，因为vue-router底层已经处理好了

1.1为什么编程式导航在进行路由跳转时，会有这种警告错误？
"vue-router": "^3.5.4"  最新的vue-router引入promise
  this.$router.push({})返回的是一个promise对象，缺了成功或者失败的回调的话，会报错

1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误,可以解决该问题。
this.$router.push({name: "search", params: {keyword: this.keyword,},query: {k: this.keyword.toUpperCase(),},},() => {},(error) => {console.log(error);});
这种写法治标不治本,在别的组件中push|replace，编程式路由还是有这种错误

1.3 在router的index.js文件中重写源码中的push和replace方法
this:当前组件实例
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给路由实例添加$router | $route 属性
push：VueRouter类的一个实例
(我觉得上面讲错了，其实就是$router是VueRouter类的一个实例，)

以下为简单讲解（这里是关于原型链的内容）
function VueRouter(){}
VueRouter.prototype.push = function(){}
let $router = new VueRouter();
$router.push(xxx);

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数location：告诉push方法，你往哪里跳转（传递哪些参数）
// 第二个参数resolve：成功的回调
// 第三个参数reject：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


2.Home模块组件拆分
 --完成静态页面--拆分静态组件--获取服务器的数据进行展示--动态业务

3.三级联动组件
---由于三级联动在Home、Search、Detail中都需要用到，设置为全局组件
   只需要注册一次

4.完成Home的其余静态组件
HTML+CSS+图片资源---信息【结构、样式、图片】

5.POSTMAN接口测试（我使用了Apipost）
测试是否能够收到轮播图的数据
http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

--服务器返回的数据code字段200，代表服务器返回数据成功
--整个项目，接口前缀都有/api字样

6.axios二次封装
向服务器发请求：XMLHttpRequest、fetch、JQ、axios

6.1为什么需要进行二次封装axios
用到以下拦截器
请求拦截器：可以在发请求之前处理一下业务
响应拦截器：当服务器数据返回以后，可以处理一些事情

6.2在项目中经常出现API文件夹【一般都是放axios】

6.3 axios的request.js配置可以参考git|npm的文档


7.接口统一管理

项目很小：完全可以在组件的生命周期函数中发送请求
项目很大：axios.get(xxx)

7.1跨域问题
跨域：协议、域名、端口号不同请求，称之为跨域
http://127.0.0.1:8080/#/home---前端项目本地服务器
http://gmall-h5-api.atguigu.cn---后台服务器

8.nprogress进度条的使用
在request.js文件中引入 nprogress是对象，start：进度条开始，done：进度条结束 
以及需要引入进度条样式
可以在请求和拦截响应器处使用

9.vuex状态管理库
vuex是官方提供的插件：状态管理库，集中式管理项目中组件共用的数据

9.1 vuex基本使用

9.2 vuex实现模块式开发
store文件中再细分home、search文件夹存放小仓库，然后再在index.js中引入和注册小仓库


10.完成TypeNav三级联动展示数据业务
TypeNav是全局组件放到Components文件夹
导航条中mounted生命周期函数中通知vuex发请求--vuex仓库的actions步骤向服务器请求数据--导航条中借助mapState从仓库中取出数据，然后遍历展示





