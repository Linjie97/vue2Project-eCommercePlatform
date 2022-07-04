// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);

// 引入store
import store from '@/store';

// 引入路由配置信息
import routes from './routes';
// console.log(VueRouter.prototype);
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
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


// 配置路由
let router = new VueRouter({
    // 配置路由
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // y=0表示滚动到最上方
        return { y: 0 }
    }
});

// 全局守卫：前置守卫
router.beforeEach(async(to, from, next) => {
    //  next放行函数  next()直接放行 next(path)放行到指定路由  next(false)不跳转
    // 用户登录了才会有token
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    if (token) {
        // 用户已经登录不可以去login或者register
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 已经登录去的不是login[home,search,shopCart,detail]
            // 如果用户名已有
            if (name) {
                next();
            } else {
                // 没有用户信息，派发actions
               try {
                // 获取用户信息
                /*注：一开始没有全局守卫，这个派发放在pages/Home组件中，一开始没有登录控制台就会报错 
                因为还没有登录但组件发请求了，没有获取用户信息，因此会报错，但是在这里就不会，因为前面
                判断了是否登录*/ 
                await store.dispatch('getUserInfo');
                next();
               } catch (error) {
                // token过期的话就到这,获取不到用户信息，需要重新登录
                // 清除过期的token
                await store.dispatch('getLogout');
                next('/login');
               }
            }
        }
    } else {
        // 未登录（游客身份）
        // 去[trade,pay,paySuccess,center]--跳转到登录页
        // 不去[trade,pay,paySuccess,center]--放行
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登录时想去却不能去的地址信息存储在路由中
            next('/login?redirect='+toPath);
        }else{
            next();
        }
    }
})

export default router;