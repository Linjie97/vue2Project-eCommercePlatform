1)登录过后首页用户信息的展示
1.1 用户注册完成，用户登录[用户名，密码] 向服务器发请求（组件派发action：userLogin），
登录成功获取到token，存储于仓库中（三连环的时候），路由跳转到home首页。
1.2 首页中（mounted）派发action（getUserInfo）获取用户信息,以及动态展示header组件内容
1.3 一刷新home首页，获取不到用户信息

2）Header组件显示用户名与退出登录(上面已讲)

3）持久化存储token
localStorage

存在的问题（暂未解决）：
a.多个组件展示用户信息需要在每一个组件的mounted中派发this.$store.dispatch('getUserInfo');不行
b. 用户已经登录，不能再跳转到登录页

4）退出登录
向服务器发请求，并清除一些数据，跳回首页

5）导航守卫
全局守卫:项目中只要发生路由变化，守卫就能监听到
路由独享守卫
组件内守卫

6）统一登录的账号
13700000000   111111（才能拿到用户地址信息）
我设置的 13602666666  159


7）交易页面
切记：获取交易页面必须是在用户登录之后
没什么新的知识点，就是写接口请求数据，store三连环，写组件页面

8）提交订单
支付静态组件；
点击提交订单按钮，需要向服务器发起一次请求【把支付的信息传递给服务器】;
不用vuex的情况下，存储数据使用数据,在main.js页面将所有api接口放到vue原型链上，无需再引入某个接口;

9)获取支付信息(不再使用vuex)
别在生命周期函数中async
写接口获取支付信息;

10)elementUI使用+按需引入
Vue:ElementUI[PC]  vant[移动端]

ElementUI按需引入(查看官网文档),配置文件发生变化,项目需要重启
配置了MessageBox

11)二维码生成 qrcode --- pay->index.vue
npm i qrcode 可以将二维码图片转成url