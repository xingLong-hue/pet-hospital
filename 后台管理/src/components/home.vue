<template>
	<!-- <div>
		<h1>我是首页的，界面。。。。。。</h1>
	</div> -->
	<el-container class="container_box">
	  <el-header class="container_header" style="height: 70px;">
		  <div class="container_header_left">
			  <img src="../assets/12.jpg" class="logo" alt="logo">
			  <span >宠物医院管理系统</span>
		  </div>
		  <div >
			  <div> 
			      <span style="font-size: 15px;">欢迎您：{{user}}</span>
				  <span>|</span>
				  <i class="el-icon-switch-button" @click="logout"></i>
				  <span style="font-size: 15px;" @click="logout">退出系统</span>
			  </div>
			 
			  
		  </div>
		
		
	
	  </el-header>
	  <!-- <br> -->
	 <el-container class="container_body">
	    <el-aside :width="isCollaspe ? '64px':'200px'" class="body_aside">
			
			<div class="togglebtn" @click="toggle_collspe">|||</div>
			
			
			<el-menu :default-active="activePath" background-color="#6AD6D8" text-color="#fff" :collapse="isCollaspe" :collapse-transition="false" router>
			      <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
			        <template slot="title">
			          <i :class="iconobj[item.id]"></i>
					  <!-- <i class="iconfont icon-tijikongjian"></i> -->
			          <span>{{item.authName}}</span>
			        </template>
					
					<el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id" @click="saveNavstatus('/'+subitem.path)">	
						  <template slot="title">
						    <i class="el-icon-menu"></i>
						    <span>{{subitem.authName}}</span>
						  </template>
					</el-menu-item>
			      
				  </el-submenu>
			 </el-menu>
		</el-aside>
	    <el-main class="body_main">
			
			<router-view></router-view>
		
		</el-main>
	  </el-container>
	</el-container>
	
</template>

<script>
	export default{
		data(){
			return{
				user:'',
				iconobj:{
					'128':'iconfont icon-baobiao',
					'125':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-danju',
					'145':'iconfont icon-baobiao',
					'200':'iconfont icon-user',
					'201':'iconfont icon-tijikongjian',
					'202':'iconfont icon-shangpin',
					'203':'iconfont icon-danju',
					'204':'iconfont icon-baobiao',
					'205':'iconfont icon-baobiao',
					'206':'iconfont icon-baobiao'
				},
				menuList:[
					// {id:'128',authName:"首 页",path:'childrenIndex'},
					{id:'125',authName:"用户管理",children:[{id:1,path:'appUser',authName:"APP客户"},{id:2,path:'doctorUser',authName:"医生用户"}]},
					{id:'145',authName:"医院简介和公告管理",children:[{id:3,path:'hospitalMsg',authName:"医院简介"},{id:4,path:'hospitalMsg2',authName:"公告信息"}]},
					{id:'200',authName:"预约和挂号管理",children:[{id:10,path:'yuYue',authName:"预约列表信息"},{id:11,path:'guaHao',authName:"挂号列表信息"}]},
					{id:'103',authName:"医院人员信息管理",children:[{id:5,path:'doctorList',authName:"医生的信息"},]},
					// {id:6,path:'nurseList',authName:"护士的信息"},
					
					
					{id:'101',authName:"值班信息管理",children:[{id:7,path:'doctorRelaxed',authName:"医生值班安排"},]},
					// {id:8,path:'nurseRelaxed',authName:"护士值班安排"},
					
					// {id:'102',authName:"手术安排管理",children:[{id:9,path:'operation',authName:"手术安排"}]},
					{id:'206',authName:"常见病治疗方法",children:[{id:16,path:'yi_liao',authName:"常见病治疗方法"}]},
					{id:'201',authName:"宠物档案中心",children:[{id:12,path:'dangAn',authName:"宠物档案"}]},
					{id:'202',authName:"请假管理",children:[{id:13,path:'qingJia',authName:"请假列表"}]},
					{id:'203',authName:"打卡记录",children:[{id:14,path:'daKa',authName:"打卡记录列表"}]},
					// {id:'204',authName:"宠物商品管理",children:[{id:15,path:'petGoods',authName:"商品列表"}]},
					{id:'205',authName:"系统中心设置",children:[{id:16,path:'systemCenter',authName:"修改密码"},{id:17,path:'systemCenter2',authName:"添加管理员"},{id:18,path:'systemCenterManage',authName:"管理员列表"}]},
					
				],
				isCollaspe:false,
				activePath:''
			}
		},
		created(){
			this.user=window.sessionStorage.getItem("user")
		},
		methods:{
			logout(){
				window.sessionStorage.clear();
				this.$router.push("/login");	
			},
			toggle_collspe(){
				this.isCollaspe=!this.isCollaspe
			},
			// 保存激活的连接
			saveNavstatus(activePath){
				window.sessionStorage.setItem("activePath",activePath)
				this.activePath=activePath
				// console.log(activePath)
			},
			
			
		}
	}
</script>

<style >
	*{
		margin: 0;
		padding: 0;
		color: #102424;
	}
	.container_box{
		/* background-color: #0086B3; */
		width: 100%;
		height: 100%;
	
	}
	.container_header{
		height: 120px;
		/* background-color: #282C35; */
		background-color:#7DE8E9;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 25px;
		color: #fff;
		
	}
	.logo{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		/* margin-top: 8px; */
	}
	.body_aside{
		background-color: #6AD6D8;
		/* height: 100%; */
		/* border: 1px solid red; */
		overflow: hidden;
	}
	.togglebtn{
		background-color: #68C8CA;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 10px;
		color: #fff;
		letter-spacing: 0.3em;
		cursor: pointer;
	}
	.container_header_left {
		display: flex;
		align-items: center;
	}
	.container_header_left span{
		margin-left: 15px;
	}
</style>
