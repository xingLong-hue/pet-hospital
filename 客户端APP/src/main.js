// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from "vant"
import 'vant/lib/index.css';
import qs from 'qs'
import axios from 'axios'

import moment from 'moment'
import { Toast } from 'vant';
Vue.use(Toast);
//挂载到vue实例对象
Vue.prototype.$http=axios
Vue.prototype.$qs = qs
//配置请求的根路径
axios.defaults.baseURL="http://127.0.0.1:3000/api/"
Vue.config.productionTip = false
 axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

 // 时间格式化 过滤器
 
 Vue.filter('dataformat',function(datastr,pattern="YYYY-MM-DD"){
	 return moment(datastr).format(pattern)
 })
 
Vue.use(Vant)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
