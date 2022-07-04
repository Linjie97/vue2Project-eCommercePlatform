import Vue from 'vue'
import App from './App.vue'
// 注册三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
// 注册轮播图的全局组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name,Carousel);
// 全局组件pagination分页器
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name,Pagination);

// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';

// 引入mockServe.js---mock数据
import '@/mock/mockServe';

// 引入swiper样式
import "swiper/css/swiper.css";

Vue.config.productionTip = false;

// 引入element-ui的button,MessageBox
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name,Button);//注册全局组件
// element-ui注册组件时还有一种写法:挂在原型上(挂在beforeCreate应该也可以,这是第三方定义的)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// // 测试 分别暴露记得加{}
// import {reqCategoryList} from '@/api';
// reqCategoryList();

// // 测试
// import {reqGetSearchInfo} from '@/api';
// console.log(reqGetSearchInfo({}));

// 统一接口api文件夹里面全部请求函数
// 统一引入 
import * as API from '@/api'
// 引入懒加载默认图片
import icon from '@/assets/images/icons.png';

// 引入图片懒加载
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  // 懒加载的默认
  loading:icon,
});

// 引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由，此时组件身上就能拥有$route $router属性
  router,
  // 注册仓库:组件实例身上会多一个属性 $store
  store,
}).$mount('#app')
