开发某个产品的详情页
1：静态组件（先将详情页的组件注册为路由组件）
点击商品的图片时，跳转到详情页面，需要带上params参数-产品id给详情页面，记得路由占位
使用编程式导航router-link，在search中为图片绑定跳转路由
滚动行为：使得路由跳转后位于页面最上方

2：发请求--请求接口

3：vuex--获取产品详情信息
vuex中还需要新增一个模块detail,需要回到大仓库进行合并

4：动态展示组件

5:数据解释--售卖属性
 遍历显示售卖属性，且注意高亮切换

6：放大镜效果：通过ref获取节点然后修改left和top值

7：购物车
购买产品个数的操作
加入购物车按钮：路由跳转之前发请求；成功跳转之后参数传递（本地存储）；失败提示失败信息
addCartSucce ：查看详情；查看购物车
购物车：
    静态组件-需要修改样式结构，调整css让各个项目对齐 删除第三项(class="cart-list-con3");

    向服务器发起Ajax，获取购物车数据(要么携带用户id登录，要么就是游客身份，否则服务器不知道传什么数据);

    UUID临时游客身份
    (在utils文件夹中新建uuid_token.js文件，查询本地存储中的UUID_TOKEN,如果没有需要给他生成，封装一个函数返回唯一身份，然后在detail.js仓库中引入该函数，在api文件夹request.js文件夹中引入store，在发请求时请求头加上这个唯一身份向后端发请求);

    动态展示购物车(后台发送的数据格式不完美);

    修改购物车产品的数量（需要发请求：参数理解）[节流]

    删除某个产品