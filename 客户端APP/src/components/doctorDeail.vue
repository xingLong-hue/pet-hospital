<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		
		<div style="background-color:#95DFFF;height: 580px;">
			<!--  -->
			<div style="padding: 15px; height: 90px; ">
				<div style="float: left;height: 100px;">
					<van-image width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
				</div>
				<div style="float: left;margin-left: 15px;height: 100px;width: 200px;">
					<p>医生：{{doctor}}</p>
					<p>科室：{{keshi}}</p>
					<p>职位：{{zhi_wei}}</p>
				</div>

			</div>
			<hr>
			<div style="margin-left: 10px;font-size: 13px;margin-top: 20px; ">
				<p>擅长：{{shanchang}}</p>
				<p>详细描述：{{detail}}</p>
			</div>
		</div>
		<br>
		
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
		
			
				keshi: '',
				doctor: '',
				zhi_wei:'',
				shanchang:'',
				detail:''
			}
		},
		created() {
			this.keshi = window.sessionStorage.getItem('keshi')
			this.doctor = window.sessionStorage.getItem('doctor')
			this.getdoctorMsg()
			
		},
		methods: {
			onClickLeft() {
				history.back()
			},
			async getdoctorMsg(){
				let {data:res}=await this.$http.get('/doctor/doctorIntroduceMsg?username='+this.doctor)
				console.log(res)
				if(res.status==200){
					this.shanchang=res.data[0].shan_chang
					this.zhi_wei=res.data[0].zhi_wei
					this.detail=res.data[0].detail
				}
			}
			
		}
	}
</script>

<style>
</style>
