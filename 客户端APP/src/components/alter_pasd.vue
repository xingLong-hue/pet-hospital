<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="box">

			<van-form @submit="onSubmit(form)">

				<van-cell-group inset>
					<van-field v-model="form.password1" name="原来的密码" label="原来的密码" placeholder="原来的密码"
						:rules="[{ required: true, message: '请填写密码' }]" />
					<van-field v-model="form.password2" type="password" name="密码" label="新的密码" placeholder="密码"
						:rules="[{ required: true, message: '请填写密码' }]" />
					<van-field v-model="form.password3" type="password" name="密码2" label="再次输入密码" placeholder="密码"
						:rules="[{ required: true, message: '请填写密码' }]" />
				</van-cell-group>
				<div style="margin: 16px;">
					<van-button round block type="primary" style="background-color:#4DBCFF ;border: none;"
						native-type="submit">确认修改</van-button>
				</div>
			</van-form>
			<br>

		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		Toast
	} from 'vant';
	Vue.use(Toast);
	export default {
		data() {
			return {
				form: {
					password1: '',
					password2: '',
					password3: ''
				},
				user: ''
			}
		},
		created() {
			this.user = window.sessionStorage.getItem("username")
		},
		methods: {
			onClickLeft() {
				history.back()
			},
			async onSubmit(form) {
				console.log(form)
				if (form.password2 !== form.password3) {
					Toast('新密码不一致，请重新输入');
				} else {
					let username=this.user
					let password=form.password1
			     // 修改前验证原来的密码是否正确
					let {
						data: res
					} = await this.$http.get('/app_users/appuser', {
						params: {
							username: username,
							password: password
						}
					})
					if(res.status==200){
						
						let password2=form.password2
						let fordata={
							username: username,
							password: password2
						}
						let da=this.$qs.stringify(fordata)
						let {
							data: res
						} = await this.$http.post('/app_users/update_pasd',da)
						// console.log(res)
						if(res.status==200){
							Toast('修改密码成功');
							this.$router.push('/')
						}
					}else{
						Toast('原来的密码错误，请重新输入！');
					}

				}
			}
		}
	}
</script>

<style scoped="scoped">


</style>
