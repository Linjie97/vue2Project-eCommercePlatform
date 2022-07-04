1.vue-cli脚手架初始化项目
步骤：对应文件夹cmd--vue create xxx(xxx是对应项目名，这里是app)

node_modules文件夹：项目依赖

public文件夹：静态资源(图片)，注意：放在此处的静态资源，webpack进行打包时会原封不动打包到dist文件夹

src文件夹（程序员源代码文件夹）：
   assets文件夹：一般也是放置静态资源（一般是放置多个组件共用的静态资源），需要注意：放在此处的静态资源，webpack进行打包时会当作一个模块，打包进JS文件里面

   components文件夹：一般放非路由组件（全局组件）

   App.vue：唯一的根组件,vue中的组件（.vue）

   main.js:程序的入口文件，最先执行的文件

babel.config.js:配置文件（Babel相关）

package.json：记录项目信息
package-lock.json：缓存性文件


2.项目的其他配置

2.1项目运行时浏览器自动打开
---package.json 修改serve项,添加--open

"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
但我这边还需要在指定本地端口号,才能打开对应网页，否则网址是0.0.0.0
  devServer:{
    host:'127.0.0.1',
    port:8080,
    open:true,
  }

2.2 eslint校验功能关闭
在根目录下，vue.config.js中添加  lintOnSave:false,//关闭eslint语法检查

2.3 src文件夹简写方式，配置别名 @表示src文件夹
  jsconfig.json配置别名@提示  

  {
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  },
  // 表示node_modules和dist文件夹下不可以使用上面的规则
  "exclude": [
    "node_modules",
    "dist"
  ]
}

3.项目路由的分析
前端所谓路由：key-value键值对
key：URL（路径）
value：相应的路由组件

注意：项目是上中下结构
路由组件：Home首页路由组件、Search路由组件、Login登录路由
非路由组件：
     Header 【首页、搜索页有】
     Footer【在首页、搜索页有，登录|注册页没有】

4.完成非路由组件Header与Footer业务
在开发项目时：
1.书写静态页面（HTML+CSS）
2.拆分组件
3.获取服务器的数据动态展示
4.完成相应的动态业务逻辑

注意1：创建组件时，组件结构 + 组件的样式 + 图片资源

注意2：项目采用的less样式，浏览器不识别less样式，需要通过less、less-loader进行处理less，把less转成css(这里less-loader视频中安装了版本5，但是对于我的node来说太低只能安装6)
npm i less less-loader@6

注意3：如果想让组件识别less样式，需要在style标签上加lang=less

4.1使用组件的步骤（非路由组件）
   -创建
   -引入
   -注册


5.路由组件的搭建
在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register

5.1 配置路由
项目中配置的路由一般放置在router文件夹中

5.2总结
路由组件与非路由组件的区别
1）路由组件一般放在pages|views文件夹中，非路由组件一般放置在components文件夹中
2）路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字)，非路由组件在使用时一般都是以标签的形式使用
3）注册完路由，不管路由组件，还是非路由组件身上都有$route、$router属性

5.3路由的跳转
路由的跳转有两种形式：
声明式导航router-link，可以进行路由的跳转(务必要有to属性)
编程式导航push|repalce，可以进行路由跳转

编程式导航：声明式导航能做的，编程式导航都能做。
但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑


6.Footer组件显示与隐藏
显示或者隐藏组件：v-if  v-show
Footer组件：在Home、Search中显示，在登录、注册时隐藏

6.1 可以根据组件身上的$router获取当前路由的信息，通过路由路径判断显示还是隐藏（适用于少数几个需要判断的）
    <!-- 在Home、Search显示，在登录、注册隐藏 -->
    <Footer v-show="$route.path=='/home'|| $route.path=='/search'"></Footer>

6.2配置路由时，可以给路由添加路由元信息【meta】，路由需要配置对象，它的key不能自己随意乱写


8.路由传参
8.1 路由跳转（请看上面5.3）
8.2 路由传参
   params参数：属于路径的一部分，配置路由时需要占位
   query参数： 不属于路径当中的一部分，不需要占位

  路由传参
      第一种：字符串形式  一个是params参数，一个是query参数
      this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase());
      第二种：模板字符串 
      this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`);
      第三种：对象写法(常用)
      this.$router.push({
        // params需要name
        name:"search",
        params:{keyword:this.keyword,},query:{k:this.keyword.toUpperCase(),}
      })

9.路由传参相关面试题
1)路由传递参数（对象写法）path是否可以结合params参数一起使用？
对象写法时可以是name、path形式，但不能和params参数一起使用，路径参数缺失是无法匹配path里面的占位符。

2）如何指定params参数可传可不传？
比如，配置路由时，params参数已经占位，但是路由跳转时不传递，URL路径会出现问题。
如何指定可传可不传：在配置路由时，在占位后加上一个？（类似正则中？的作用，出现1次或者0次）

3）params参数可以传递也可以不传递，但是如果传递时空串，如何解决？
 使用undefined解决params参数可以传递、不传递（空的字符串）
  this.$router.push({ name:"search",params:{keyword:''||undefined},query:{ k:this.keyword.toUpperCase()} })

4）路由组件能不能传递props数据？
可以的：三种写法，vue教程中有，对象、布尔、函数（常用）
在router->index.js文件中配置
对象：{key:value}
布尔：props:true//传递params参数
函数：props:($route)=>{return {params参数或者是query参数}}
