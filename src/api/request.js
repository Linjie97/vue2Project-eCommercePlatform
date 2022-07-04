// 对于axios进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// nprogress是对象，start：进度条开始，done：进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css';

// 在当前模块中引入store
import store from '@/store';

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests其实就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时路径会出现api
    baseURL:"/api",
    // 代表请求超时的时间5s
    timeout:5000,
});

// 请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求出去之前处理一下业务
requests.interceptors.request.use((config)=>{
    // config:配置对象，其header属性（请求头）很重要
    // console.log(store);
    if(store.state.detail.uuid_token){
        // 如果存在游客身份id，给请求头加上userTempId(后台确定好了的请求头)
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    // 进度条开始动
    nprogress.start();
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器相应数据回来后，响应拦截器可以检测到，再做一些处理
    // 进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('fail'));
});

export default requests;
