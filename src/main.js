//入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//2.1导入 vue-resource
import VueResource from 'vue-resource'
//2.2安装 vue-resource
Vue.use(VueResource)



//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//导入 app 根组件
import app from './App.vue'

//按需导入 Mint-ui 中的组件 
import { Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header);
//注册轮播图组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


//1.3导入自己的router.js路由模块
import router from './router.js'


var vm= new Vue({
  el:'#app',
  render: c=>c(app),
  //1.4挂载路由对象到VM实例
  router
})