<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div style="text-align: center;">
			<h2>我的值班信息</h2>
			
			<!-- <h4>姓名：{{username}}</h4> -->
			<table border="1" cellspacing="0" cellpadding="4">

				<tr>
					<td>星期</td>
					<td>星期一</td>
					<td>星期二</td>
					<td>星期三</td>
					<td>星期四</td>
					<td>星期五</td>
					<td>星期六</td>
					<td>星期日</td>
				</tr>
				<tr :data="list">
					<td>状态</td>
					<td>{{list.mondayStatus}}</td>
					<td>{{list.tuesdayStatus}}</td>
					<td>{{list.wednesdayStatus}}</td>
					<td>{{list.thursdayStatus}}</td>
					<td>{{list.fridayStatus}}</td>
					<td>{{list.saturdayStatus}}</td>
					<td>{{list.sundayStatus}}</td>
				</tr>
				
			</table>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				list:[],
				month:'',
				day:''
			}
		},
		created(){
			this.username=window.sessionStorage.getItem("username")
			// console.log(this.username)
			this.getzhibanMsg()
			this.gettime()
		},
		methods:{
			onClickLeft() {
				history.back()
			},
			async getzhibanMsg(){
				
				let {data:res}=await this.$http.get('/zhiban/selfzhibanMsg?username='+this.username)
				console.log(res)
				if(res.status==200){
					this.list=res.data[0]
					console.log(this.list)
				
				}
				
			},
			gettime(){
				let time=new Date()
				// let year=time.getFullYear()//年
				let month=time.getMonth()+1 //月
				let day=time.getDate() //日
				
				let str=time.getDay()  //数字对应的星期
				
				this.month=month
				this.day=day
			},
		
			
			
		}
	}
</script>

<style>
</style>
