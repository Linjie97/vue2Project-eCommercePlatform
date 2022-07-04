import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo ,reqLogout} from '@/api';
import { setToken,getToken,removeToken } from '@/utils/token';
const state = {
    code: "",
    token: getToken(),
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 清除本地数据
    CLEAR(state){
        state.token='';
        state.userInfo={};
        removeToken();
    }
};
const actions = {
    async getCode({ commit }, phone) {
        // 获取验证码的接口把验证码直接返回，正常当然是发到用户手机上
        let result = await reqGetCode(phone);
        // 如果验证码发到用户手机上，下面无需再写
        if (result.code === 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },

    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },

    // 登录业务【token令牌】
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 服务器下发token，用户唯一标识符(uuid)
        // 将来经常带token找服务器要用户信息进行展示
        if (result.code === 200) {
            commit("USERLOGIN", result.data.token);
            // 持久化存储
            setToken(result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    // 获取用户信息【带token】
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code === 200) {
            // 提交用户信息
            commit('GETUSERINFO', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },

    // 退出登录
    async getLogout({commit}){
        let result = await reqLogout();
        if(result.code===200){
            commit('CLEAR');
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}