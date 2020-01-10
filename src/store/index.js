import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);


const state = {
    serchName:'',//搜索框输入的内容
    addreData:{
        lev1:{
            id:null,//国家城市1级ID
            name:null,
            areaCode:null
        },
        lev2:{
            id:null,//国家城市2级ID
            name:null,
            areaCode:null
        },
        lev3:{
            id:null,//国家城市3级ID
            name:null,
            areaCode:null
        },
        lev4:{
            id:null,//国家城市4级ID
            name:null,
            areaCode:null
        },
        name:'',
        phone:'',
    },
    
    
}
const getters = {
    
}

const mutations = {
	SETSTOPCARLIST(state, arr=[]) {
        return (state.selectionShopCar = arr)
    },
   
}

const actions = {
	setstopcarlist(context, arr=[]) {
        return context.commit('SETSTOPCARLIST', arr)
    },
    
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})