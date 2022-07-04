import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api';
// 封装游客身份模块uuid-->生成一个随机字符串，生成一次就不能再改了
import {getUUID} from '@/utils/uuid_token';
const state = {
     goodInfo:{},
    // 游客临时身份(也是一个，不能说刷新一次就给一个新的身份)
    uuid_token:getUUID(),
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code===200){
            commit('GETGOODINFO',result.data);
        }
    },
    // 将产品添加至购物车中||修改某个产品的个数
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车的解构
        // 加入购物车以后（发请求）前台将参数带给服务器，服务器写入数据成功，并没有返回数据，只返回code=200
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // 当前整个函数如果指向返回promise 
    },
};
const getters = {
    // 是数组还是对象可以去vuex仓库查看
    // 路径导航简化的数据（就是图片上面的产品分类路径）
    categoryView(state){
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
}