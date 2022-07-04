// 对于axios进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.mockRequests其实就是axios，只不过稍微配置一下
const mockRequests = axios.create({
    baseURL:"/mock",
    // 代表请求超时的时间5s
    timeout:5000,
});

// 请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求出去之前处理一下业务
mockRequests.interceptors.request.use((config)=>{
    // config:配置对象，其header属性（请求头）很重要
    nprogress.start(); // 进度条开始动
    return config;
})

// 响应拦截器
mockRequests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器相应数据回来后，响应拦截器可以检测到，再做一些处理
    nprogress.done();// 进度条结束
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
});

export default mockRequests;
