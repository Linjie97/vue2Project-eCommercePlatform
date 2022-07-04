import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api/index';
const state={
    cartList:[],
};
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions={
    // 获取购物车列表数据
    async getCartList({commit}){
       let result = await reqCartList();
       if(result.code===200){
           commit("GETCARTLIST",result.data);
       }
    },
    // 删除某个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        //删除不用返回数据,只需要知道结果
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    // 修改购物车某个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
      let result = await reqUpdateCheckedById(skuId,isChecked);
      if(result.code===200){
        return 'ok'
    }else{
        return Promise.reject(new Error('fail'));
    }
    },
    // 删除全部勾选产品
    deleteAllCheckedCart({dispatch,getters}){
        // console.log(context);//context小仓库，包含了commit[提交mutations修改state] getters[计算属性] dispatch[派发actions] state[当前仓库数据]
        // 获取购物车中的全部产品（数组）
        let PromiseAll = [];
        let cartInfoList = getters.cartList.cartInfoList|| [];
        cartInfoList.forEach(item=>{
           let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuId',item.skuId) : '';
          //将每一次返回的promise添加到数组中
          PromiseAll.push(promise);
        });
        // 只有数组中每个promise都成功才能成功
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态(类似上面，调用前面的方法)
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item=>{
           let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
           PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll)
    },
};
const getters={
    cartList(state){
        return state.cartList[0] || {};
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
}