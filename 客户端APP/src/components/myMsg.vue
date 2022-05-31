<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<br>
		
		<div class="box">
			<van-image round width="7rem" height="7rem" :src="url" />
			<br>
			<div>
				<van-cell-group inset v-for="(item,index) in formMsg" :key="item.label">
				  <van-field v-model="item.value" :label="item.label"  />
				</van-cell-group>
			</div>
		
		</div>
	
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Toast
	} from 'vant';
	
	Vue.use(Toast);
	
	export default{
		data(){
			return{
				formMsg:[
					{
						label:'昵称',
						value:''
					},	
				
					{
						label:'年龄',
						value:''
					},
					{
						label:'职位',
						value:''
					},
					{
						label:'科室',
						value:''
					},
					{
						label:'地址',
						value:''
					},
					{
						label:'用户名',
						value:''
					},
				
					
				],
				username:'',
				url:''
			}
		
		},
		created() {
			this.username=window.sessionStorage.getItem("username")
			this.getMsg()
		
		},
		methods:{
			onClickLeft() {
				history.back()
			},
			async getMsg(){
				let {data:res}=await this.$http.get('/doctor/doctor_userMsg?username='+this.username)
				console.log(res)
				if(res.status==200){
					this.formMsg[0].value=res.data[0].nickname
					this.formMsg[1].value=res.data[0].age
					this.formMsg[2].value=res.data[0].zhi_wei
					this.formMsg[3].value=res.data[0].ke_shi
					this.formMsg[4].value=res.data[0].address
					this.formMsg[5].value=res.data[0].username
					this.url=res.data[0].headphoto
					
				}
				
			},
			
	
			
			 
		}
	}
</script>

<style scoped="scoped">
	.head{
		text-align: center;
	}
	.box{
		text-align: center;
	}
</style>

