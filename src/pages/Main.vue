<template>
	<div>
		<router-view></router-view>
		<van-tabbar v-model="active">
		  <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
		  <van-tabbar-item to="/category" icon="birthday-privilege" dot>分类</van-tabbar-item>
		  <van-tabbar-item to="/cart" icon="cart" :info="cartCount>0?cartCount:''">购物车</van-tabbar-item>
		  <van-tabbar-item to="/my" icon="contact" >我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import store from '@/vuex/store'
import {mapState} from 'vuex'
export default {
  store,
  data() {
    return {
      active: 0,
      cartCount:''
    }
  },
  computed:{
  	...mapState({
      selectGoods: state => state.selectGoods//绑定store.selectGoods到组件，之后可用this.selectGoods获取
   })
  },
  mounted(){
  	this.upDateCount()
  },
  methods:{
  	//更新购物车数量
	upDateCount(){
	   let num = 0;
	   this.selectGoods.forEach((item, index) => {
	      num += item.count;
	   });
	   this.cartCount = String(num)
	}
  }
}
</script>

<style scoped>

</style>