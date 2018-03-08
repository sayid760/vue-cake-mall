<template>
	<div class="home">
		<!--轮播图-->
		<div class="banner">
			<van-swipe :autoplay="3000">
			  <van-swipe-item v-for="(item, index) in images" :key="index">
			    <img v-lazy="item.image" />
			  </van-swipe-item>
			</van-swipe>
		</div>
		<!--信息列表-->
		<van-notice-bar 
		  text="美味热线：3658-84554455   每一款蛋糕都让您感受幸福的味道"
		  left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
		/>
		<!--商品列表-->
	    <div class="goods-list-wrapper">
	    	<ul class="goods-list" v-waterfall-lower="loadMore"  waterfall-disabled="isWaterfallDisabled"  waterfall-offset="400">
	    		<li  v-for="(list,index) in lists" :key="index">
	    			<!--<router-link  :to="{name: 'detail', params: {id: list.id}}">-->
	    			<!--<router-link :to="{path:'/detail',query: {name: id}}">-->
	    				<router-link :to="{name:'detail',params:{id:list.id}}">
		    			<div class="photo">
		    				<img v-lazy="list.img"> 
		    			</div>
		    			<div class="info">
		    				<h3 class="title">
						       {{list.name}}
						    </h3>
						    <div class="bot">
						    	<span class="price">￥{{list.price}}</span>
						    	<div class="btn-buy"><i class="van-icon van-icon-shopping-cart"></i></div>
						    </div>
		    			</div>
	    			</router-link>
	    		</li>
	    	</ul>
	    	<div class="loading" v-if="loading">
			  <van-loading  :type="'spinner'" :color="'black'"></van-loading><span>加载中...</span>
			</div>
			<div v-if="nodata==0">没有数据了！！！</div>
	    </div>
	    <!--<div class="load" v-show="loading"><van-loading type="spinner" color="black" />加载中...</div>-->
	    
	</div>
</template>

<script>
import Vue from 'vue'
import url from '../../assets/js/api.js'
import axios from 'axios'

import { Card,Loading } from 'vant';
Vue.component(Card.name, Card);
Vue.component(Loading.name, Loading);

import { Waterfall } from 'vant';

export default {
	  data() {
	    return {
	      images: [],
	      lists: null,
          bannerLists: null,
          isWaterfallDisabled:false,
          loading:false,
          nodata:1,
          pageNum: 1,
          pageSize: 6
	    }
	  },
	  mounted(){
          this.getBanner()
	  },
	  directives: {
	    WaterfallLower: Waterfall('lower')
	  },
      methods: {
      	getBanner(){
      		axios.get(url.banner).then(res=>{
            	this.images=res.data.lists
      		})
      	},
        loadMore(){
	      if(this.nodata==0) return false;
	      if(this.loading) return false;
	      this.loading = true;
	
	      this.pageNum++
	      
	      let that=this;
	      setTimeout(function(){
	        axios.post(url.hotLists,{
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res=>{
            	let curLists = res.data.lists
	            if(res.data.length==0){
	                that.nodata=0;
	            }
	            if(that.lists){
                    that.lists = that.lists.concat(curLists)
                }else{
                    that.lists = curLists
                }
	
	            that.loading = false
	          });
	
	      },1000)
	    }
      } 
}
</script>

<style lang="less" scoped="">

.home{
	padding-bottom: 1.8rem;
	.van-swipe{ 
		height: 4.46rem;
	    img{ 
	    	width: 100%; height: 100%;
	    }
   } 
   .goods-list-wrapper{
   	 .goods-list{
   	 	display: flex;
   	 	flex-wrap: wrap;
   	 	justify-content: space-between;
   	 	margin: 0 2%;
   	 	li{
   	 		width: 49%;
   	 		background: #fff;
   	 		margin: 0.1rem 0;
   	 		.photo{
   	 			img{
   	 				width: 100%;
   	 				height: 100%;
   	 			}
   	 		}
   	 		.info{
   	 			padding: 0.08rem 0.15rem 0.15rem 0.15rem;
   	 			.title{
   	 				font-size: 0.28rem;
   	 				color: #333;
   	 				line-height: 0.38rem;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-line-clamp: 2;
				    -webkit-box-orient: vertical;
   	 			}
   	 			.bot{
   	 				display: flex;
   	 				justify-content: space-between;
   	 				align-items: center;
   	 				margin: 0.1rem 0 0.2rem 0;
   	 				.price{
   	 					font-size: 0.32rem;
   	 					color: #f44;
   	 				}
   	 				.btn-buy{
	   	 				width: 0.48rem;
					    height: 0.48rem;
					    color: #f44;
					    background-color: #fff;
					    -webkit-box-sizing: border-box;
					    -moz-box-sizing: border-box;
					    box-sizing: border-box;
					    text-align: center;
					    font-size: 0.24rem;
					    cursor: pointer;
					    border: 1px solid #f44;
					    border-radius: 50%;
					    display: flex;
					    justify-content: center;
					    align-items: center;
					    float: right; 
	   	 			}
   	 			}

   	 		}
   	 	}
   	 }
   }
}
</style>