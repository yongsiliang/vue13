//入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用 main.js ，在刚调用的时候，先从本地存储中，
//把购物车数据从本地存储中读取出来
var car =JSON.parse(localStorage.getItem('car') || '[]' ) 

var store =new Vuex.Store({
  state:{//this.$store.state.***
    car:car//将购物车中的商品数据，用一个数组存储起来，在car数组中存储一些
          // 商品的对象，可以将这个商品对象，设计成这个样子 
          // { id:商品id ,count:要购买的数量,price:商品的单价,selected:true }
  },
  mutations:{//this.$store.commit('方法名称'，按需传递唯一的参数名称)
    addToCar(state,goodsinfo){
      //点击加入购物车，把商品信息，保存到 store 中的car上
      //分析：
      //1.如果购物车之前已经有这个对应的商品了，那么，只需要更新数量
      //2.如果没有，则直接 把商品数据 ，push 到car中即可

      //假设在购物车没有找到对应的产品
      var flag = false

      state.car.some(item=>{
        if(item.id== goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag =true
          return true
          
        }
      })
      //如果最后循环完毕，得到的flag还是false
      if(flag === false ){
        state.car.push(goodsinfo)
      }

      //当更新 car 之后，把car 数组，存储到本地 localStorage 中
      localStorage.setItem('car',JSON.stringify(state.car))


    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中商品的数量值
      //分析：
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          tem.count =parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，把最新的购物车数据保存到 localStorage 中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFromCar(state,id){//根据id从store中的购物车中删除对应那条商品数据
      state.car.some((item,i) =>{
        if(item.id == id){
          state.car.splice(i,1)
          return true
        }
      })
      //将删除完毕后的，最新购物车数据，同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected= info.selected
        }
      })
      //把最新的 多有的购物车商品转改保存到 store 中去
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{//this.$store.getters.***
    //相当于计算属性，也相当与filters
    getAllCount(state){
      var c = 0
      state.car.forEach(item=>{
        c +=item.count
      })
      return c
    },
    getGoodsCount(state){
      var o= {}
      state.car.forEach(item=>{
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmont(state){
      var o={
        count:0, //勾选的数量
        amount:0//勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count
          o.amount+=item.price*item.count
        }
      })
      return o
    }

  }


})


import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})



//2.1导入 vue-resource
import VueResource from 'vue-resource'
//2.2安装 vue-resource
Vue.use(VueResource)




//设置请求 的根路径
Vue.http.options.root = 'http://47.89.21.179:8080';
//全局设置post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//导入 app 根组件
import app from './App.vue'

//按需导入 Mint-ui 中的组件 
// import { Header,Swipe, SwipeItem ,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header);
// //注册轮播图组件
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);

// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

//1.3导入自己的router.js路由模块
import router from './router.js'


var vm= new Vue({
  el:'#app',
  render: c=>c(app),
  //1.4挂载路由对象到VM实例
  router,
  store  //挂载 store 状态管理对象
})