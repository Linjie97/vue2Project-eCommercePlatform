import {v4 as uuidv4} from 'uuid';
// 生成随机字符串，且每次执行不能发生变化，游客身份持久存储
// 以下虽然简单，但是思路满重要的，类似于单例模式，切记只能有一个身份
// (除非骚操作：用户手动清除本地存储中的UUIDTOKEN)
export const getUUID=()=>{
    // 先从本地存储获取uuid（看一下本地存储里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有就生成并存储到本地中
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}