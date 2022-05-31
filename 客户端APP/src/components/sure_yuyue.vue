<template>
	<div>
		<br>
		<van-nav-bar left-text="医生主页" left-arrow @click-left="onClickLeft" />
		<br>
		<div style="background-color: #6AD6D8;height: 160px;">
			<!--  -->
			<div style="padding: 15px; height: 90px; ">
				<div style="float: left;height: 100px;">
					<van-image width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
				</div>
				<div style="float: left;margin-left: 15px;height: 100px;width: 200px;">
					<p>医生：{{doctor}}</p>
					<p>科室：{{keshi}}</p>
				</div>

			</div>
			<div style="margin-left: 10px;font-size: 13px; ">
				<p>擅长：附加费看得见放得开</p>
			</div>

		</div>
		<br>
		<div id="">
			<div style="margin: 10px;">
				<van-button @click="show = true" type=primary>点击选择预约日期</van-button>&nbsp;&nbsp;
				<van-button style="width: 150px;">日期：{{date}}</van-button>
				<van-calendar v-model="show" @confirm="onConfirm" />
			</div>
			<div>
				<van-picker show-toolbar title="选择预约时间段" :columns="columns" @confirm="onfirm"/>
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
	export default {
		data() {
			return {
				username:'',
				petname:'',
				phone:'',
				keshi: '',
				doctor: '',
				date: '',
				show: false,
				columns: [
				        // 第一列
				        {
				          values: ['上午', '下午'],
				          defaultIndex: 2,
				        },
				        // 第二列
				        {
				          values: ["8:00-9:00","9:00-10:00","10:00-11:00","11:00-12:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00"],
				          defaultIndex: 1,
				        },
				      ],
				form:{},
			}
		},
		created() {
			this.keshi = window.sessionStorage.getItem('keshi')
			this.doctor = window.sessionStorage.getItem('doctor')
			this.username=window.sessionStorage.getItem("username")
			this.petname=window.sessionStorage.getItem("petname")
			this.phone=window.sessionStorage.getItem("phone")
			this.history=window.sessionStorage.getItem('history')
		},
		methods: {
			onClickLeft() {
				history.back()
			},
			onfirm(value, index) {
				// Toast(`当前值：${value}, 当前索引：${index}`);
				console.log(value[0])
				console.log(index)
				this.form={
					keshi:this.keshi,
					doctor:this.doctor,
					day:this.date,
					time:value,
					username:this.username,
					petname:this.petname,
					phone:this.phone,
				}
				console.log(this.form)
				//  Toast(`预约成功`);
				// // 成功预约返回首页
				// this.$router.push('/mycenter')
				this.yuyue(this.form)
				
				
			},
		
			formatDate(date) {
			   
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			},
			onConfirm(date) {	
				
				this.show = false;
				this.date = this.formatDate(date);
			},
			
			// 提交预约的数据到数据库
			
			async yuyue(form){
				// console.log("预约form里的数据",form)
				// 判断是否设置宠物信息
				let {data:res1}=await this.$http.get('/dangAn/getPetMsg?petusername='+this.username)
				console.log(res1,".....")
				if(res1.status==200){
					if(res1.data[0].petname==null){
						alert("请先去个人中心添加宠物信息")
					}
					else{
						let da=this.$qs.stringify(form)
						
						let {data:res}= await this.$http.post('yuYue/insertyuYueMsg',da)
						console.log(res)
						
						if(res.status==200){
							Toast(`预约成功`);
							// 成功预约返回首页
							this.$router.push('/mycenter')
						}
					}
				}
				
				
				// let da=this.$qs.stringify(form)
				
				// let {data:res}= await this.$http.post('yuYue/insertyuYueMsg',da)
				// console.log(res)
				
				// if(res.status==200){
				// 	Toast(`预约成功`);
				// 	// 成功预约返回首页
				// 	this.$router.push('/mycenter')
				// }
				
			}
			
		}
	}
</script>

<style>
</style>
