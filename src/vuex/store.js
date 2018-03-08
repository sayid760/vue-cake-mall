import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
	selectGoods:[]
}

const mutations={
	add( state , data ){
        state.selectGoods.push( data )
   },
   remove( state , data){
        state.selectGoods.splice(data, 1);
        }
}

const actions={
        addGoods( {commit} , data ){
            commit('add',data)
        },
        removeGoods( {commit} , data ){
            commit('remove',data)
        }
        
}

export default new Vuex.Store({
    state,
    mutations,
    actions

});