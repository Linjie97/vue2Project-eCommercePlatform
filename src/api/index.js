// 当前模块：API进行统一管理
import requests from './request';
import mockRequests from './mockAjax';

// 三级联动的接口
// 接口 http://gmall-h5-api.atguigu.cn
// 请求地址 /api/product/getBaseCategoryList
// 请求方式 GET 无参数

// export const reqCategoryList = ()=>{
//     return requests({url:'/product/getBaseCategoryList',method:'get'});
// }
// 发请求:axios发请求1返回结果时Promise对象
// requests中带有baseURL:"/api",不需要再携带
// 简化上述步骤
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});

// 配置vue-cli代理所使用的完全url
// export const reqCategoryList = ()=>requests({url:'http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList',method:'get'});

// 获取banner（Home首页轮播图）--使用mock
export const reqGetBannerList = ()=>mockRequests.get('/banner');

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

// 获取搜索模块数据  地址：/api/list  请求方式：post
/*
  需要携带参数，比如
  {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/ 
// 当前接口给服务器传递参数params，至少是一个空对象,否则返回结果code是201
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params});

// 获取产品详情信息的接口：URL： /api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

// 获取购物车列表数据接口
// /api/cart/cartList
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'});

// 删除购物车产品接口
// /api/cart/deleteCart/{skuId}  method:DELETE
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//切换商品选中状态
// /cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 用户注册
// /api/user/passport/register
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',method:'post',data});

// 用户登录
// /api/user/passport/login
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',method:'post',data});

// 获取用户信息[需要带着用户的token向服务器要用户信息]
//  user/passport/auth/getUserInfo  GET
export const reqUserInfo = ()=>requests({url:'user/passport/auth/getUserInfo',method:'get'});

// 退出登录
// /api/user/passport/logout  GET
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息
//  /user/userAddress/auth/findUserAddressList   GET
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList ',method:'get'});

// 获取商品清单
// /api/order/auth/trade
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单的接口
// /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

// 获取支付信息
// /payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 获取支付订单状态
// /payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取个人中心的订单列表
// /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});

