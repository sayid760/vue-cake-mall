let url = {
    hotLists: '/index/hotLists',
    banner: '/index/banner',
    details: '/goods/details',
    goodsList:'/category/goodsList'
//  topLists:'/category/topList',
//  subLists: '/category/subList',
//  rank: '/category/rank',
//  searchList: '/search/list',
//  deal: '/goods/deal',
//  cartAdd:'/cart/add',
//  cartLists: '/cart/list',
//  cartReduce: '/cart/reduce',
//  cartRemove: '/cart/remove',
//  cartMremove: '/cart/mremove',
//  updata: '/cart/updata',
//  addressLists: '/address/list',
//  addressAdd:'/address/add',
//  addressRemove: '/address/remove',
//  addressUpdata: '/address/update',
//  addressSetDefault: '/address/setDefaul'
}

let host = 'https://easy-mock.com/mock/5a98e6c87a528e391791c398/cakemart'

for (var key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
        
    }
}  

export default url