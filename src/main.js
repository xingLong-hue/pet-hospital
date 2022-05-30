// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
import './assets/css/global.css'

import moment from 'moment'

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts


//导入全局样式图标
import './assets/fonts/iconfont.css'
import 'default-passive-events'
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(ElementUI);

// 配置axios,请求模块
Vue.prototype.$http=axios
Vue.prototype.$qs = qs
//配置请求的根路径
 axios.defaults.baseURL="http://127.0.0.1:3000/api/"
 // axios.defaults.baseURL="/api"
 axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
 
 // 时间格式化 过滤器
 
 Vue.filter('dataformat',function(datastr,pattern="YYYY-MM-DD"){
	 return moment(datastr).format(pattern)
 })
 
 
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
