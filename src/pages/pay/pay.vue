<template>
	<div class="pay">
		<div class="pay-cont">
			<van-cell-group>
			<!-- 联系人卡片 -->
			<van-contact-card
			  :type="cardType"
			  :name="currentContact.name"
			  :tel="currentContact.tel"
			  @click="showList = true"
			/>
			
			<!-- 联系人列表 -->
			<van-popup v-model="showList" position="bottom">
			  <van-contact-list
			    v-model="chosenContactId"
			    :list="list"
			    @add="onAdd"
			    @edit="onEdit"
			    @select="onSelect"
			  />
			</van-popup>
			
			<!-- 联系人编辑 -->
			<van-popup v-model="showEdit" position="bottom">
			  <van-contact-edit
			    :contact-info="editingContact"
			    :is-edit="isEdit"
			    @save="onSave"
			    @delete="onDelete"
			  />
			</van-popup>
		</van-cell-group>

		<van-cell-group>
			<van-card
			  :title="item.name"
			  :desc="item.kindName"
			  :num="item.count"
			  :price="item.price"
			  :thumb="item.smpic" v-for="item in goods"
			  :key="this"
			/>
		</van-cell-group>
		
		<van-cell-group>
		  <van-cell title="支付方式" is-link :value="payResult[0]" @click="showType = true"/>
		  <!-- 支付方式 -->
			<van-popup v-model="showType" position="right"  class="showType">
			<van-nav-bar
			  title="支付方式"
			  left-text="返回"
			  left-arrow
			  @click-left="showType = false"
			/>
			<h1 class="title">网上方式</h1>
			<van-checkbox-group v-model="payResult">
				  <van-checkbox
				    v-for="(item, index) in paylist"
				    :key="item"
				    :name="item"
				  >
				     {{ item }}
				  </van-checkbox>
			  </van-checkbox-group>
			</van-popup>
		</van-cell-group>
		
		<van-cell-group>
		  <van-cell title="商品金额" :value="'¥ '+(totalPrice/100).toFixed(2)" />
		  <van-cell title="总运费" value="¥ 0" />
		</van-cell-group>
	  </div>
	  <van-submit-bar
		  :price="totalPrice"
		  button-text="提交订单"
		  @submit="onSubmit"
		/>
    </div>
</template>

<script>
  import store from '@/vuex/store'
  import {mapState} from 'vuex'
  import { Toast } from 'vant'
  import { Dialog } from 'vant'
//import {eventBus} from '../../assets/js/eventBus'
  
export default {
  store,
  data() {
    return {
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      }],
      showType:false,
      paylist: ['支付宝', '微信', '中国建设银行'],
      payResult: ['支付宝'],
      goods:[]
    };
  },

  computed: {
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
    ...mapState({
      selectGoods: state => state.selectGoods//绑定store.selectGoods到组件，之后可用this.selectGoods获取
   }),
   totalPrice() {
        //  return this.goods.reduce((total, item) => total + parseInt(item.price)*item.count)
         let sumResult=0
	   	 this.goods.forEach((item, index) => {
		    sumResult+=item.price*item.count*100
	     });
         return sumResult 
    },
  },
  mounted(){

  },
  created(){
   this.goods=this.$route.params.list
// console.log( this.goods)
  },
  methods: {
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;      
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;
      
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
    //提交订单
    onSubmit(){
    	let that=this
    	if(this.chosenContactId == null){
    		Toast('请添加收货地址');
    	}else{
    		Dialog.confirm({
			  title: '确认支付',
			  message: '是否支付¥'+that.totalPrice
			}).then(() => {
			  
			  Toast.loading({
				  mask: true,
				  message: '支付中...'
			  });
			  setTimeout(function(){
			  	 that.$router.push({path: '/paysuc'});
			  },2000)
			  
			  that.goods.forEach((item, index) => {
//			    	that.selectGoods.splice(index, 1);
			    	that.$store.dispatch('removeGoods',index)
			    	console.log('删除了'+that.goods[index].kid)
		      });
			  
			}).catch(() => {
			  // on cancel
			});
			
			
			
			
			
    	}
    	
    }
  },
  watch:{
  	payResult(e,old){
//		let index = this.payResult.indexOf(old);
//		if (index != -1) {
//			this.payResult.splice(index, 1);
//		}
        //如果存在两个值，就把old的值去掉，保留最新的值
		if(this.payResult.length>1){
			this.payResult.splice(0,1);
		}       
  		this.showType=false
  	}
  }
};
</script>

<style lang="less" scoped>
	
	
</style>