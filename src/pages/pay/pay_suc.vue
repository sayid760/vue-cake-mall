<template>
	<div class="paySuc">
		<div class="paySuc-top">
			<p>
			   <i class="van-icon van-icon-passed"></i>
			     <span>支付成功</span>
			</p>
			
			<div class="msg">
				<h1>送货信息</h1>
				<span>我们将尽快安排发货，请买家保持手机通讯顺畅，以便快递哥哥能第一时间联系到您</span>
			</div>
		</div>
		<div class="btn">
			<router-link to="/home">
				<van-button size="normal">返回首页</van-button>
			</router-link>
		</div>
		
	</div>
</template>

<script>
</script>

<style lang="less" >
.paySuc{
	.paySuc-top{
		padding:0.2rem 5%;
		background: #fff;
		color: #333;
		p{
			padding: 0.5rem 0;
			border-bottom: 1px solid #e5e5e5;
			display: flex;
			flex-direction: column;
			align-items: center;
			.van-icon-passed:before{
				color: #00c000;
			}
			span{
				font-size: 0.4rem;
				margin: 0.2rem 0 0 0;
			}
		}
		.msg{
			display: flex;
			flex-direction: column;
			padding: 0.2rem 0;
			h1{
				font-size: 0.32rem;
			}
			span{
				font-size: 0.26rem;
				line-height: 0.32rem;
				margin: 0.2rem 0 0 0;
			}
		}
		
	}
	.btn{
		text-align: center;
		.van-button{
		}
	}
}
	
</style>