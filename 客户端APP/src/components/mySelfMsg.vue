<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<br>
		
		<div class="box">
			
			
			<div>
				<van-cell-group inset v-for="(item,index) in formMsg" :key="item.label">
				  <van-field v-model="item.value" :label="item.label"  />
				</van-cell-group>
			</div>
			<br>
			<div>
				<div style="float: left;margin-left: 25px;">
					我的宠物
				</div>
				<div style="float: left;margin-left: 30px;">
					 <van-image  width="3rem" height="3rem" :src="url" />
				</div>
			</div>
			<br>
			<div style="clear: both;"></div>
			<div>
				<div style="float: left;margin-left: 25px;">
					我的头像
				</div>
				<div style="float: left;margin-left: 30px;">
					 <van-image  width="3rem" height="3rem" :src="url1" />
				</div>
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
						label:'邮箱',
						value:''
					},
					{
						label:'性别',
						value:''
					},
					
					{
						label:'电话',
						value:''
					},
					{
						label:'地址',
						value:''
					},
					{
						label:'宠物名称',
						value:''
					},
					{
						label:'用户名',
						value:''
					},
					
				],
				username:'',
				url:'',
				// queryInfo: {
				// 	query_data: '', //查询的参数
				// 	page_num: 1, //当前的页码
				// 	page_size: 3 //每页显示的条数
				// },
				pet:'',
				url1:''
			}
		
		},
		created() {
			this.username=window.sessionStorage.getItem("username")
			this.getMsg()
			
			this.dangAn_Msg()
		
		},
		methods:{
			onClickLeft() {
				history.back()
			},
			async getMsg(){
				let {data:res}=await this.$http.get('/app_users/mySelfMsg?username='+this.username)
				console.log(res)
				if(res.status==200){
					this.formMsg[0].value=res.data[0].nickname
					this.formMsg[1].value=res.data[0].email
					this.formMsg[2].value=res.data[0].sex
					this.formMsg[3].value=res.data[0].phone
					this.formMsg[4].value=res.data[0].address
					this.formMsg[5].value=res.data[0].petname
					this.formMsg[6].value=res.data[0].username
					this.url1=res.data[0].headphoto
				}
				
			},
			async dangAn_Msg() {
			
				let {
					data: res
				} = await this.$http.get('/dangAn/getPetMsg?petusername='+this.username)
				console.log(res.data)
				
				if(res.status==200){
					this.url=res.data[0].photoUrl
				
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

