<template>
  <div class="user">
    <!--<img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">-->
    <div class="user-top">
    	<div class="photo">
    		<img src="../../assets/images/wow-12.png">
    	</div>
    	<div class="base-info">
    		<p>Olivia</p>
    		<span>个人档案，去完善<i class="van-icon van-icon-arrow"></i></span>
    	</div>
    </div>
    <van-row class="user-links">
      <van-col span="6">
      	<router-link  :to="{name:'/orderList',params: {active: 1}}">
	        <van-icon name="pending-payment" />
	                待支付
        </router-link>
      </van-col>
      <van-col span="6">
        <van-icon name="pending-orders" />
	        <router-link :to="{name:'/orderList',params: {active: 2}}">
	        待收货
        </router-link>
      </van-col>
      <van-col span="6">
      	<router-link :to="{name:'/orderList',params: {active: 3}}">
	        <van-icon name="pending-evaluate" />
	        待评价
        </router-link>
      </van-col>
      <van-col span="6">
	        <van-icon name="logistics" />
	        退换货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
    	<router-link to="/orderList">
    		<van-cell icon="records" title="全部订单" is-link />
    	</router-link>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="exchange" title="我的积分" is-link />
      <van-cell icon="gold-coin" title="我的优惠券" is-link />
      <van-cell icon="gift" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 7.5rem;
    height: 4rem;
    display: block;
  }
  &-group {
    margin-bottom: .3rem;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      margin-bottom: 0.12rem;
    }
  }
  &-top{
  	width: 100%;
  	height: 3rem;
  	background: #ff6d55;
  	display: flex;
  	align-items: center;
  	font-size: 0.38rem;
  	color: #fff;
  	.photo{
	    margin-left: 5%;
	    width: 1.6rem;
	    height: 1.6rem;
	    border-radius: 50%;
	    background:#E5E5E5;
	    background-size:100%;
	    img{
	    	width: 100%;
	    	height: 100%;
	    }
  	}
  	.base-info{
  		margin-left: 5%;
  		line-height: 0.55rem;
  		span{
  			font-size: 0.28rem;
  			.van-icon{
  				position: relative;
			    top: 0.04rem;
  			}
  		}
  	}
  }
}
</style>