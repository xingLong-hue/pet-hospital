<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div style="text-align: center;">
			<h1>在线请假</h1>
		</div>
		<van-form @submit="onSubmit(form)">
			<van-cell-group inset>
				<van-cell title="请假的日期" :value="date" @click="show = true">点击选择日期</van-cell>
				<van-calendar v-model="show" @confirm="onConfirm" />
				<van-field v-model="form.howlong" name="请假时长" label="请假时长" placeholder="请假时长"
					:rules="[{ required: true, message: '请填写请假时长' }]" />
				<van-field v-model="form.li_you" name="请假理由" label="请假理由" placeholder="请假理由"
					:rules="[{ required: true, message: '请填写请假理由' }]" />
			<!-- 	<p style="text-align: center;margin-left: 120px;">
					<van-radio-group v-model="form.checked" direction="horizontal">
							<van-radio name="1">申请</van-radio>
					</van-radio-group>
				</p> -->

			</van-cell-group>
			
			<div style="margin: 16px;">
				<van-button round block type="primary" native-type="submit">
					提交
				</van-button>
			</div>
		</van-form>
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
				form: {
					// name: '',
					time: '',
					howlong: '',
					li_you: '',
					checked: '',
					username:''
				},
				date: '',
				show: false


			}
		},
		created(){
			this.form.username=window.sessionStorage.getItem("username")
		},
		methods: {
			onClickLeft() {
				history.back()
			},
			async onSubmit(form) {
				
				console.log(form)
				let formdata=this.$qs.stringify(form)
				
				let {data:res}=await this.$http.post("/qingjia/tijiao",formdata)
				console.log(res)
				if(res.status==200){
					Toast('已提交申请。');
				}

			},
			formatDate(date) {
			      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			    },
			onConfirm(date) {
			  this.show = false;
			  this.form.time = this.formatDate(date);
			 this.date = this.formatDate(date);
			}
		}

	}
</script>

<style>
</style>
