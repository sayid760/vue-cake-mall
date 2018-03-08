<template>
	<div class="goods">
		<van-swipe class="goods-swipe" :autoplay="3000">
			<van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
				<img v-lazy="thumb">
			</van-swipe-item>
		</van-swipe>

		<van-cell-group>
			<van-cell>
				<div class="goods-title">{{ goods.name }}</div>
				<div class="goods-price">￥{{goods.currentPrice}}</div>
			</van-cell>
			<van-cell class="goods-express">
				<van-col span="10">运费：{{ goods.express }}</van-col>
				<van-col span="14">剩余：{{ goods.remain }}</van-col>
			</van-cell>
		</van-cell-group>

		<van-cell-group class="goods-cell-group">
			<van-cell value="进入店铺" icon="shop" is-link>
				<template slot="title">
					<span class="van-cell-text">蛋糕小店</span>
					<van-tag type="danger">官方</van-tag>
				</template>
			</van-cell>
			<van-cell title="线下门店" icon="location" is-link />
		</van-cell-group>

		<van-cell-group class="goods-cell-group">
			<van-cell title="查看商品详情" is-link />
		</van-cell-group>

		<van-goods-action>
			<van-goods-action-mini-btn icon="chat">
				客服
			</van-goods-action-mini-btn>
			<van-goods-action-mini-btn icon="cart" :info="cartCount>0?cartCount:''" @click="goCart">
				购物车
			</van-goods-action-mini-btn>
			<van-goods-action-big-btn primary @click="onAddcart">
				加入购物车
			</van-goods-action-big-btn>
			<!--<van-goods-action-big-btn primary>
				立即购买
			</van-goods-action-big-btn>-->
		</van-goods-action>

        


		<!--购物弹窗-->
		<van-popup v-model="isShow" position="bottom" transition="popup-slide">
		  <div class="skuBox">
				<div class="skuBox-cont">			
					<div class="skuBox-top">
						<div class="infor">
							<img v-lazy="smpic">
							<p>
								<span class="price">￥32</span>
								<span class="count">库存：{{total}}</span>
								<span class="selected">已选：{{kindName}}</span>
							</p>
						</div>
						<i class="van-icon van-icon-close" @click="closeBtn"></i>
					</div>
					<div class="skuBox-wrap">
						<div class="title">规格</div> 
						<ul>
							<li v-for="(item,index) in kinds" :key="index"  :class="{active: index === nowIndex}" @click="chooseType(index)">{{kinds[index].kindName}}</li>
						</ul>
					</div>
					<div class="skuBox-wrap">
						<div class="title">数量</div>
						<van-stepper v-model="count"/>
					</div>
				</div>
				<button class="btn" @click="addToCart">加入购物车</button>
			</div>
		</van-popup>
		
		
		<!--<div class="gif">
			<div class="layer-mask" v-if="isShow"></div>
			<transition name="transHeight">
				<div class="layerWrap" v-if="isShow" @click="closeBtn">
					<div class="layer-cont" @click="stop">
						
					</div>
				</div>
			</transition>
		</div>-->
	</div>
</template>

<script>
import axios from 'axios';
import url from '../../assets/js/api.js'
import store from '@/vuex/store'
import {mapState} from 'vuex'
import { Dialog } from 'vant'
	export default {
		store,
		data() {
			return {
				nowIndex: 0,
				goods: {},
				id: this.$route.params.id,
				isShow: false,
				kinds:[],
				kindName:'',
				total:'',
				kid:'',
				smpic:'',
				count:1,
				cartCount: '',
			}
		},
		mounted(){
			this.getDetails();
			this.upDateCount();
		},
		computed:{
			...mapState({
          selectGoods: state => state.selectGoods//绑定store.selectGoods到组件，之后可用this.selectGoods获取
	   })
		},
		methods: {
			getDetails() {
				const _this = this;
				axios.get(url.details + '?id=' + this.id)
					.then(res => {
						console.log(res.data.data);
						this.goods = res.data.data
						this.kinds=this.goods.kinds
						this.kindName=this.kinds[0].kindName
						this.total=this.kinds[0].total
						this.kid=this.kinds[0].kid
						this.smpic=this.goods.smpic
						console.log(this.kinds[2].kid)
					})
					.catch(function() {
						console.log(error);
					});
			},
			onAddcart() {
				this.isShow = true
				console.log('1111111')
				this.count=1
			},
			closeBtn() {
				this.isShow = !this.isShow
			},
			stop(event) {
				event.cancelBubble = true
			},
			sendGift() {

			},
			//选择类型
			chooseType(index){
				this.nowIndex = index
				this.kindName=this.kinds[index].kindName
				this.total=this.kinds[index].total
				this.kid=this.kinds[index].kid
			},
			//加入购物车
			addToCart(){
console.log(this.selectGoods)

		    	let flag = true;
			    let num = 0;
			
			    this.selectGoods.forEach((item, index) => {
			      // 通过kid值判断购物车是否已经存在商品,如果存在就不添加
			      if (this.kid == item.kid) {
			        flag = false;		
			        if(this.count != item.count){
			        	 item.count+=this.count
				         console.log('不等')
				         this.isShow=!this.isShow
				         this.upDateCount()
			        }
			      }
			    });

          if(flag){
          	this.$store.dispatch( 'addGoods' , {
	          	name:this.goods.name,
	          	price:this.goods.currentPrice,
	          	id:this.goods.id,
	          	smpic:this.goods.smpic,
	          	kid:this.kid,
	          	kindName:this.kindName,
	          	count:this.count,
	          	check:true
	          })
          	this.upDateCount()
          	this.isShow=!this.isShow
          }
          
		},
		//更新购物车数量
	  upDateCount() {
	    let num = 0;
	    this.selectGoods.forEach((item, index) => {
	      num += item.count;
	    });
	    this.cartCount = String(num)
	  },
	  //跳转到购物车
	  goCart(){
	  	this.$router.push({path: '/cart'});
	  }
		}
	};
</script>

<style lang="less">
	.goods {
		padding-bottom: 50px;
		&-swipe {
			img {
				width: 7.5rem;
				height: 7.5rem;
				display: block;
			}
		}
		&-title {
			font-size: 16px;
		}
		&-price {
			color: #f44;
		}
		&-express {
			color: #999;
			font-size: 12px;
			padding: 5px 15px;
		}
		&-cell-group {
			margin: 15px 0;
			.van-cell__value {
				color: #999;
			}
		}
		.skuBox{
			 position: fixed;
			 left: 0;
			 bottom: 0;
			 width: 100%;
			 background: #fff;
			 font-size: 0.28rem;
			.skuBox-cont {
				padding: 0 5%;
				.skuBox-top{
					display: flex;
			    justify-content:space-between;
			    align-items:flex-start;
			    border-bottom:1px solid  #e5e5e5;
			    padding:0.2rem 0; 
			    i{
			    	font-size: 0.4rem;
			    }
			    .infor{
			    	display: flex;
			    	img{
				    	width:1.5rem;
				    	height:1.5rem;
				    }
				    p{
				    	margin-left: 0.3rem;
				    	display: flex;
				    	justify-content: space-around;
				    	flex-direction: column;
				    	align-items:flex-start;
				    }
			    }
				}
				.skuBox-wrap{
					border-bottom:1px solid  #e5e5e5;
					padding:0.2rem 0; 
					.title{
	        	color: #999;
	        	margin-bottom: 0.2rem;
	        }
	        ul{
	        	li{
	            height: 0.56rem;
	            line-height: 0.56rem;
	            border: 1px solid #CCC;
	            border-radius: 0.05rem;
	            padding: 0 0.5rem;
	            display: inline-block;
	            margin:0 0.1rem 0.15rem 0;
	            &.active{
	            	border: 1px solid #f44;
	            	background: #f44;
	            	color: #fff;
	            }
	        	}
	        }
				}
			}
			.btn {
				width: 100%;
				height: 0.9rem;
				line-height: 0.9rem;
				border-radius: 0;
				padding: 0;
				border: none;
				background: #f44;
				color: #fff;
				font-size: 0.3rem;
			}		
		}
		
	}
	
</style>