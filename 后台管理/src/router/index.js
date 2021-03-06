import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import home from '@/components/home'

import childrenIndex from'../components/children.vue'
import appUserList from'../components/userManage/appUser.vue'
import doctorUser from'../components/userManage/doctorUser.vue'
import hospitalMsg from '../components/hospitalMassage/hospitalIntroduce.vue'
import hospitalMsg2 from '../components/hospitalMassage/gongGao.vue'
import doctorlist from '../components/hospitalPersion/doctorList.vue'
import nurselist from '../components/hospitalPersion/nurseList.vue'
import doctorRelaxed from '../components/zhibanMsg/doctorZhiBanMsg.vue'
import nurseRelaxed from '../components/zhibanMsg/nurseZhiBanMsg.vue'
import operation from '../components/operation/operationMsg.vue'
import yuYue from '../components/yuYueGuaHaoManage/yuYue.vue'
import guaHao from '../components/yuYueGuaHaoManage/guaHao.vue'
import dangAn from '../components/dangAn/petDangAn.vue'
import qingjia from '../components/qingJia/qingJia.vue'
import daKa from '../components/daKa/daKa.vue'
import petGoods from '../components/petGoods/petGoods.vue'
import systemCenter from '@/components/systemCenter/systemCenter'
import systemCenter2 from '@/components/systemCenter/systemCenter2'
import systemCenterManage from'../components/systemCenter/systemCenterManage.vue'
import yi_liao from '../components/yi_liao/yi_liao.vue'



Vue.use(Router)
const routes=[
	{ path:'/', redirect:'/login'},
	{ path: '/login', component: Login},
	{ 
	 path:'/index',
	 component:home,
	 children:[
		 {path: '/index', component: childrenIndex},
		 {path: '/doctorUser', component: doctorUser},
		 {path: '/appUser', component: appUserList},
		 {path: '/hospitalMsg', component: hospitalMsg},
		 {path: '/hospitalMsg2', component: hospitalMsg2},
		 {path: '/doctorlist', component: doctorlist},
		 {path: '/nurselist', component: nurselist},
		 {path: '/doctorRelaxed', component: doctorRelaxed},
		 {path: '/nurseRelaxed', component: nurseRelaxed},
		 {path: '/operation', component: operation},
		 {path: '/operation', component: operation},
		 {path: '/yuYue', component: yuYue},
		 { path:'/guaHao', component:guaHao},
		 { path:'/dangAn', component:dangAn},
		 { path:'/qingJia', component:qingjia},
	     { path:'/daKa', component:daKa},
		 { path:'/petGoods', component:petGoods},
		 { path:'/systemCenter', component:systemCenter},
		{ path:'/systemCenter2', component:systemCenter2},
		{ path:'/systemCenterManage', component:systemCenterManage},
		{ path:'/yi_liao', component:yi_liao},
		],
	},
	{ path:'/register', component:Register},
	
]
// ??????????????????
const router = new Router({
	routes
})

// // //????????????????????????
// router.beforeEach((to,from,next)=>{
// 	// to?????????????????????
// 	// from?????????????????????????????????
// 	// next??????????????????????????????
// 	//next()????????????    next( ' /login ')????????????
	
// 	if (to.path === '/login') return next();
	
// 	//??????token???
// 	const tokenStr = window.sessionStorage.getItem( 'token');
	
// 	if (!tokenStr) return next('/login');    //token?????? ??????????????????????????????
// 	//token????????????????????????
// 	next()
// 	}
// )

export default router
