import {reqGetSearchInfo} from '@/api';
// search模块的小仓库
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    // 获取search模块的数据
    async getSearchList({commit},params={}){
        // 当前这个reqGetSearchInfo在调用获取服务器数据时至少传递一个参数（空对象）
        // params默认是一个空对象
      let result = await reqGetSearchInfo(params);
      if(result.code === 200){
          commit('GETSEARCHLIST',result.data);
      }
    }
};
//  计算属性
// 项目当中getters主要作用是：简化仓库中的数据（简化数据而生）
// 可以把我们将来在组件中需要使用的数据简化一下（以便将来组件获取数据）
const getters = {
    // 当前形参state是当前仓库中的state，并非大仓库中的state
    goodsList(state){
        //如果actions还没派发(比如网络很差的情况)，那这是undefined，需要加一个空数组，至少页面不会崩
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }
    
};
export default {
    state,
    mutations,
    actions,
    getters,
}