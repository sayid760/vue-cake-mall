<template>
 	<div class="categories_content">
		<div class="categories_list" ref="menuWrapper">
			<van-badge-group :activeKey="activeKey">
				<van-badge :title="item.name" @click="onClick" v-for="item in categoryList" :key="this"></van-badge>
			</van-badge-group>
		</div>
		<div class="categories_box" ref='foodsWarpper'>
			<div class="cont" >
				<div class="goods-item">
					<ul>
						<li v-for="item in category" :key="this">
							<div class="thumb">
								<img v-lazy="item.pic">
							</div>
							<div class="detail">
								<div class="title">{{item.name}}</div>
								<div class="price">￥{{item.currentPrice}}</div>
								<div class="recommend">
									<span>推荐值:</span> <span>8844</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
import url from '../../assets/js/api.js'
import Scroll from 'better-scroll'
import axios from 'axios'
	
	export default {
		data() {
			return {
				activeKey: 0,
				categoryList: [],
				category:[]
			};
		}, 
		mounted() {
			axios.get(url.goodsList).then(res => {
			    console.log(res.data.data.type)
				this.categoryList = res.data.data.type
				this.category=this.categoryList[0].goods
				this.$nextTick(() => {
					this.scroll()
				})
				console.log()
			})
			//dom更新好之后的回调 等于window.onload
		},
		methods: {
			onClick(key) {
				this.activeKey = key;
			//	$('.cont').eq(key).show().siblings('.cont').hide()
			    this.category=this.categoryList[key].goods
			    console.log(this.categoryList[key].goods)
			},
			scroll() {
				/* eslint-disable no-new */
				new Scroll(this.$refs['foodsWarpper'], {
					click: true
				})
				new Scroll(this.$refs['menuWrapper'], {
					click: true
				})

			}
		}
	};
</script>

<style scoped lang="less">
@import '../../assets/css/base.less'; 
.categories_content {
	display: -webkit-flex;
	display: flex;
	position: fixed;
	width: 100%;
	top: 0;
	bottom: 50px;
	overflow: hidden;
	.categories_list {
		-webkit-flex: 1;
		flex: 1;
	}
	.categories_box {
		background: #fff;
		-webkit-flex: 6;
		flex: 6;
		.cont {
			display: none;
           .goods-item{
				display: block;
			    position: relative;
			    width: auto;
			    margin-bottom: 12px;
			    display: flex;
			    flex-direction: column;
			    li{
			      display: flex;
			      justify-content: flex-start;
			      padding: 0.2rem 0 0.2rem 3%;
			      .border-1px();
			      .thumb{
			      	    flex: 1;
					    width: 1.8rem;
					    height: 1.8rem;
					    img{
					      width: 100%;
					      height: 100%;
					    }
				    }
				    .detail{
				    	flex: 2;
				    	display: flex;
				    	flex-direction: column;
				    	justify-content: space-around;
				    	font-size: 0.32rem;
				    	margin-left: 0.2rem;
				    	.title{
				    		line-height: 0.38rem;
				    		overflow: hidden;
						    text-overflow: ellipsis;
						    display: -webkit-box;
						    -webkit-line-clamp: 2;
						    -webkit-box-orient: vertical;
				    	}
				    	.price{
				    		color: #f44;
				    	}
				    	.recommend{
				    		color: #999;
				    	}
				    }
			    }
			    
			} 
		}
		.cont:first-child {
			display: block;
		}
	}
}

</style>