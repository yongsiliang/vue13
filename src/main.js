//入口文件
import Vue from 'vue'


//导入mint-ui样式
import './lib/mui/css/mui.min.css'

//导入 app 根组件
import app from './App.vue'

//按需导入 Mint-ui 中的组件
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)

//


var vm= new Vue({
  el:'#app',
  render: c=>c(app)
})