1)删除选中全部产品的操作
全选input隔壁的[删除选中的商品]按钮
注意：没有一次删除多个产品的接口，但是可以通过id删除一个产品的接口
请查询store中的shopcart.js文件中[删除全部勾选产品]部分，直接methods中调用另一个方法并派发
Promise.all([p1,p2,p3]); p1|p2|p3都是promise对象，有一个失败都失败，全部成功才成功

2）全选操作
全选input：在store中增加一个全选的函数updateAllCartIsChecked，函数调用[修改购物车中某个产品的选中状态]的函数updateCheckedById，并在组件中调用updateAllCartIsChecked，然后更新数据

3）登录与注册功能（git）：必须要会的技能
3.1 登录与注册静态组件（处理共用图片资源问题）
3.2 assets文件夹--放置全部组件共用静态资源
3.3 样式css中也可以使用@符号[src别名]但是需要在前面加~

4）注册的业务--表单验证先不做
4.1获取验证码
  接口/api/user/passport/sendCode/{phone}  get
4.2注册用户

5）登录业务
5.1注册---通过数据库存储用户信息（名字，密码）
5.2登录---登录成功时，后台为了区分用户，服务器下发token【令牌：唯一标识符】
登录接口做的不完美，一般登录成功服务器只下发token（没有用户信息），前台持久化存储token，带着token找服务器要用户信息进行展示
store中三连环存储token，但是刷新之后会消失，需要本地存储

6）token令牌理解

注意：vuex仓库存储数据---不是持久化，一刷新很多数据都会变化