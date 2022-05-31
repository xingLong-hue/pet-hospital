import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login.vue"
import home from "@/components/home"
import index from "@/components/index"
import introduce from "@/components/introduce"
import mycenter from "@/components/mycenter"
import register from "@/components/register"

import yuyue from "@/components/yuyue"
import sure_yuyue from "@/components/sure_yuyue"

import guahao from "@/components/guahao"
import sure_guahao from "@/components/sure_guahao"
import mYguahao from "@/components/mYguahao"
import keshi from "@/components/keshi"
import mYyuYue from '../components/myYuYue.vue'
import gongGao from '../components/gongGao.vue'

import shezhi from '../components/shezhi.vue'
import alter_pasd from "../components/alter_pasd.vue"
import doctorIntroduce from '../components/doctorIntroduce.vue'

import yi_liao from '../components/yi_liao.vue'
import doctorDeail from '../components/doctorDeail.vue'
import environment from '../components/environment.vue'


import home1 from "@/components/home1"
import index1 from "@/components/index1"
import introduce1 from "@/components/introduce1"
import mycenter1 from "@/components/mycenter1"
import online_qingjia from '../components/online_qingjia.vue'
import online_daka from '../components/online_daka.vue'
import mYdaka from '../components/mYdaka.vue'
import mYqingjia from '../components/mYqingjia.vue'
import alter_pasd1 from "../components/alter_pasd1.vue"
import shezhi1 from '../components/shezhi1.vue'
import myMsg from '../components/myMsg.vue'
import mySelfMsg from '../components/mySelfMsg.vue'
import mypet from '../components/mypet.vue'
import myZhiban from'../components/myZhiban.vue'
// import register1 from "@/components/register1"
Vue.use(Router)

// 重复点击导航时，控制台出现报错  router 文件夹下，添加如下代码：
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
	  // redirect:'/login',
      component: login
    },
	{
	  path: '/home',
	  name: 'home',
	  component: home,
	  children:[
		  {
			path: '/index',
			name: 'index',
			component: index,
		  },
		  {
			path: '/introduce',
			name: 'introduce',
			component: introduce,
		  },
		  {
			path: '/mycenter',
			name: 'mycenter',
			component: mycenter,
		  },
	  ]
	},
	{
	  path: '/register',
	  name: 'register',
	  component: register
	},
	{
	  path: '/yuyue',
	  name: 'yuyue',
	  component: yuyue
	},
	{
	  path: '/sure_yuyue',
	  name: 'sure_yuyue',
	  component: sure_yuyue
	},
	{
	  path: '/guahao',
	  name: 'guahao',
	  component: guahao
	},
	{
	  path: '/sure_guahao',
	  name: 'sure_guahao',
	  component: sure_guahao
	},
	{
	  path: '/mYguahao',
	  name: 'mYguahao',
	  component: mYguahao
	},
	
	{
	  path: '/keshi',
	  name: 'keshi',
	  component: keshi
	},
	{
	  path: '/mYyuYue',
	  name: 'mYyuYue',
	  component: mYyuYue
	},
	{
	  path: '/gongGao',
	  name: 'gongGao',
	  component: gongGao
	},
	{
	  path: '/shezhi',
	  name: 'shezhi',
	  component: shezhi
	},
	{
	  path: '/alter_pasd',
	  name: 'alter_pasd',
	  component: alter_pasd
	},
	{
	  path: '/doctorIntroduce',
	  name: 'doctorIntroduce',
	  component: doctorIntroduce
	},
	{
	  path: '/yi_liao',
	  name: 'yi_liao',
	  component: yi_liao
	},
	{
	  path: '/doctorDeail',
	  name: 'doctorDeail',
	  component: doctorDeail
	},
	{
	  path: '/environment',
	  name: 'environment',
	  component: environment
	},
	{
	  path: '/home1',
	  name: 'home1',
	  component: home1,
	  children:[
	  		  {
	  			path: '/index1',
	  			name: 'index1',
	  			component: index1,
	  		  },
	  		  {
	  			path: '/introduce1',
	  			name: 'introduce1',
	  			component: introduce1,
	  		  },
	  		  {
	  			path: '/mycenter1',
	  			name: 'mycenter1',
	  			component: mycenter1,
	  		  },
	  ]
	},
	{
	  path: '/online_qingjia',
	  name: 'online_qingjia',
	  component: online_qingjia
	},
	{
	  path: '/online_daka',
	  name: 'online_daka',
	  component: online_daka
	},
	{
	  path: '/mYqingjia',
	  name: 'mYqingjia',
	  component: mYqingjia
	},
	{
	  path: '/mYdaka',
	  name: 'mYdaka',
	  component: mYdaka
	},
	{
	  path: '/alter_pasd1',
	  name: 'alter_pasd1',
	  component: alter_pasd1
	},
	{
	  path: '/shezhi1',
	  name: 'shezhi1',
	  component: shezhi1
	},
	{
	  path: '/myMsg',
	  name: 'myMsg',
	  component: myMsg
	},
	{
	  path: '/mySelfMsg',
	  name: 'mySelfMsg',
	  component: mySelfMsg
	},
	{
	  path: '/mypet',
	  name: 'mypet',
	  component: mypet
	},
	{
	  path: '/myZhiban',
	  name: 'myZhiban',
	  component: myZhiban
	},
	
	
  ]
})
