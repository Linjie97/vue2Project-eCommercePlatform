1)支付成功跳转到PaySuccess页面
   绑定两个路由跳转即可

2）个人中心
  二级路由跳转；
  订单表格，遍历数据显示，分页器
  面试：是否自己封装过组件：分页器、日历

3）全局守卫
未登录访问，交易相关（trade）、支付相关（pay、paySuccess）、用户中心（center）相关跳转到登录页面
同时，考虑到把未登录时想去却不能去的地址信息存储在路由中，在Login处调整一下，如果存在query信息则跳转到原本想去的页面，没有就去home

4）路由独享守卫/组件内守卫
只有从购物车界面才能跳转到交易页面（创建订单）
只有从交易页面（创建订单）才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面--这里使用了组件内守卫，前面两个使用了路由独享守卫

5）图片懒加载
https://www.npmjs.com/package/vue-lazyload
默认的图片放在src/assets文件夹,在main.js中引入图片懒加载以及注册
在search.vue中将原本引入图片的:src改成自定义指令v-lazy即可实现
这里一开始遇到一个bug，需要改装1.3.3版本的vue-lazy

*小知识点：自定义插件--对外暴露一个对象，必须有install方法，可以参考vue官方文档
使用插件通过全局方法 Vue.use()，给的组件例如router，vuex 其实都是暴露了install方法
  Vue.use(MyPlugin)// 调用 `MyPlugin.install(Vue)`
这个之前貌似没有讲过，是插件和自定义指令结合使用，视频中老师讲得太乱了，官方文档及其简洁


6）vee-validate表单验证使用
弹幕同学们表示elementui就有表单验证可以使用

第一步：插件安装与引入
https://www.npmjs.com/package/vee-validate
npm i vee-validate@2 --save
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

第二步：提示信息
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field) => `${field}必须与密码相同` //修改内置规则得message，让确认密码和密码相同
    },
    attributes:{//给校验得field属性名映射中文名称
        phone:'手机号',
        code:'检验码',
        password:'密码',
        password1:'确认密码',
        isCheck:'协议',
    }
})

第三步：基本使用
<input placeholder="请输入你的手机号" v-model="phone" name="phone" 
        v-validate="{ required: true, regex: /^1\d{10}$/ }" 
        :class="{ invalid: errors.has('phone') }"/>
 <span class="error-msg">{{ errors.first("phone") }}</span>

 第四步：自定义校验规则（最后同意协议部分）
VeeValidate.Validator.extend('agree',{
    validate:value => {
        return value
    },
    getMessage:field => field + '必须同意'
})

第五步：在Register组件中
      // 表单项全部验证成功
      const success = await this.$validator.validateAll();
  但是在这里我一直出现报错，Uncaught (in promise) Error: fail  最后发现是手机号注册过再次注册报错，可以将用户注册（三连环中）输出错误部分return Promise.reject(new Error(result.message))


7）路由懒加载
 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载
 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应组件，这样就更加高效
 说白了就是按需加载
 以后都使用路由懒加载，在对应路由的组件处写一个箭头函数，例如：
 component: ()=> import("@/pages/Home")

 8）打包上线
 8.1打包 npm run build
 在js文件夹中的map文件
 项目打包后，代码都是经过压缩加密的，如果运行时报错，给出的错误信息无法准确得知是哪里的代码报错
 有了 map 就可以像未加密的代码一样，准确输出是哪一行哪一列有错
 所以该文件如果项目不需要是可以去除的
 在vue.config.js 配置  productionSourceMap:false  即可

 8.2购买云服务器
  打包上线的项目需要部署在服务器上才能展示