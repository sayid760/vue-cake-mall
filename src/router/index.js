import Vue from 'vue'
import Router from 'vue-router'
import Main from 'pages/Main'
import home from 'pages/home/home'
import category from 'pages/category/category'
import cart from 'pages/cart/cart'
import my from 'pages/my/my'
import detail from 'pages/detail/detail'
import pay from 'pages/pay/pay'
import paysuc from 'pages/pay/pay_suc'
import orderList from 'pages/my/orderList'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'cur',
	routes: [{
		path: '/',
		//name: 'Main',
		component: Main,
		children: [
			 {
	            path: '',
	            name: 'Main',
	            component: home
	        },
	        {
	            path: '/home',
	            name: 'home',
	            component: home
	        },
			{
				path: '/category',
				name: 'category',
				component: category,
			},
			{
				path: '/my',
				name: 'my',
				component: my,
			}
		]
	},{
		path: '/cart',
    name: 'cart',
    component: cart
	},{
		path: '/detail/:id',
    name: 'detail',
    component: detail,
   // redirect: '/detail/:itemId',//使用重定向
	},{
		path:'/pay',
		name:'/pay',
		component:pay
	},{
		path:'/paysuc',
		name:'/paysuc',
		component:paysuc
	},{
		path:'/orderList',
		name:'/orderList',
		component:orderList
	}
	]
})
