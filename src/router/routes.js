// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';

// 路由懒加载,无需在一开始就引入Home
// const foo = ()=> import("@/pages/Home");
// 以后直接写懒加载形式，无需写上面的import xxx from 'yyy';

// 路由配置信息
export default [
    {
        path: "/home",
        // component: Home,
        component: ()=> import("@/pages/Home"),
        meta: { show: true },
    },
    {
        name: "search",
        // ？表示keyword整个params参数可传可不传
        path: "/search/:keyword?",
        component: ()=>import("@/pages/Search"),
        meta: { show: true },
    },
    {
        path: "/login",
        component: ()=>import('@/pages/Login'),
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/detail/:skuid?",
        component: Detail,
        meta: { show: true },
    },
    {
        name:'addcartsuccess',
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true },
    },
    {
        // name:'shopcart',
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true },
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页只能是从购物车页来的 
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false);//中断当前的导航，如果浏览器的url改变了那么会重置到from路由对应得地址
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        // 去支付页的只能是从交易页来的
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true },
    },
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        // 二级路由组件
        children:[
            {
                path:'myOrder',
                component:myOrder,
            },{
                path:'groupOrder',
                component:groupOrder,
            },{
                // 重定向
                path:'/center',
                redirect:'/center/myOrder'
            }
        ]
    },
    // 重定向
    // 项目跑起来的时候，访问/立马让他定向到首页
    {
        path: '*',
        redirect: '/home',
    }
]