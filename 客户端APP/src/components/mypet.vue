<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="box">
			<div>
				<van-cell-group inset v-for="(item,index) in formMsg" :key="item.label">
				  <van-field v-model="item.value" :label="item.label" placeholder="请输入" />
				</van-cell-group>
				
			</div>
		
	
			<div>
				<div style="float: left;margin-left: 25px;">
					我的宠物
				</div>
				<div style="float: left;margin-left: 30px;">
					 <van-image  width="3rem" height="3rem" :src="url" />
				</div>
			</div>
			
			
			<van-uploader v-model="fileList" multiple :max-count="1" :after-read="uploadImg"
				:before-read="beforeRead" upload-text="更换宠物图片"/>
		
				
			<br><br>
			<van-button type="primary" @click="complete()">完成设置</van-button>
		</div>


	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Toast
	} from 'vant';
	
	Vue.use(Toast);
	export default {
		data() {
			return {
				formMsg:[
					{
						label:'宠物名称',
						value:''
					},
					{
						label:'主人',
						value:''
					},
					{
						label:'电话',
						value:''
					},
					
					{
						label:'病史',
						value:''
					},
				
				],
				username:'',
				fileList:[],//图片
				url:''
			}
		},
		created() {
			this.username=window.sessionStorage.getItem("username")
			this.getMsg()
			
		},

		methods: {
			onClickLeft() {
				history.back()
			},
			async complete(){
				console.log(this.formMsg)
				
				let formdata=this.formMsg
				let username=this.username
				
				let dada={
					username:username,
					form:formdata
				}
				let da_ta=this.$qs.stringify(dada)
				console.log(dada)
				let {data:res}=await this.$http.post('/dangAn/postPetMsg',da_ta)
				console.log(res)
				if(res.status==200){
					Toast('设置成功');
					
				}
			},
			async getMsg(){
				let {data:res}=await this.$http.get('/dangAn/getPetMsg?petusername='+this.username)
				console.log(res)
				if(res.status==200){
					
					this.formMsg[0].value=res.data[0].petname
					this.formMsg[1].value=res.data[0].petusername
					this.formMsg[2].value=res.data[0].phone
					this.formMsg[3].value=res.data[0].history
					// this.formMsg[4].value=res.data[0].photoUrl
					this.url=res.data[0].photoUrl
				}
			},
			// 图片上传
			async uploadImg(filephoto) {
			  console.log(filephoto);  //控制台可以看见图片信息
			  const param = new FormData();
			  param.append("pet_img", filephoto.file); 
			  param.append("username",this.username); 
			  let {data:res}=await this.$http.post("/uploadPetphoto/photo", param, {
			    headers: { "Content-Type": "multipart/form-data" }
			  })
					
			 console.log(res)
			},
			beforeRead(file) {
	
			  return true;
			},
			beforeDelete(file) {
				
			  return false;
			},
		
		}



	}
</script>

<style scoped="scoped">
	.content {
	    padding: 16px 16px 160px;
	}
	.van-cell{
		padding: 10px;
	}
	.box{
		text-align: center;
	}
</style>
