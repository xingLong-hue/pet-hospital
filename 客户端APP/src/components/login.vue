<template>
	<div class="container">

		<div class="box">
			<van-form @submit="onSubmit(form)">
				<van-image round width="7rem" height="7rem" :src="url" />
				<br>
				<van-cell-group inset>
					<van-field v-model="form.username" name="用户名" label="用户名" placeholder="用户名"
						:rules="[{ required: true, message: '请填写用户名' }]" class="login" />
					<van-field v-model="form.password" type="password" name="密码" label="密码" placeholder="密码"
						:rules="[{ required: true, message: '请填写密码' }]" class="login" />
					<br>
					
						<van-radio-group v-model="form.checked" direction="horizontal" >
							<van-radio name="1">普通用户</van-radio>
							<van-radio name="2">医生用户</van-radio>
						</van-radio-group>
					<br>
				</van-cell-group>

				<div style="margin: 16px;">
					<van-button round block type="primary" style="background-color:#4DBCFF ;border: none;"
						native-type="submit">登录</van-button>
				</div>
			</van-form>
			<br>
			<a @click="register">没有账号？注册一个</a>
		</div>


	</div>
</template>

<script>
	import {
		Notify
	} from 'vant';
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					checked: ''
				},
				url: 'https://img.yzcdn.cn/vant/cat.jpeg',
				
			}
		},
		created() {

		},
		methods: {
			async onSubmit(form) {
				let userRole=form.checked
				let user = form.username
				let pasd = form.password
				if(userRole==1){
					// 普通用户登录
					let {
						data: res
					} = await this.$http.get("/app_users/appuser", {
						params: {
							username: user,
							password: pasd
						}
					})
					if (res.status == 200) {
						window.sessionStorage.setItem("id", res.data[0].id)
						window.sessionStorage.setItem("nickname", res.data[0].nickname)
						window.sessionStorage.setItem("username", res.data[0].username)
						window.sessionStorage.setItem("petname", res.data[0].petname)
						window.sessionStorage.setItem("phone", res.data[0].phone)
						window.sessionStorage.setItem('history', res.data[0].history)
						window.sessionStorage.setItem('headphoto', res.data[0].headphoto)
						this.url = res.data[0].headphoto
						this.$router.push("/home")		
					} else {		
						Notify('身份或账号或密码错误，请重新输入!');
					}
				}else if(userRole==2){
					// 医生用户登录
						let {
							data: res
						} = await this.$http.get("/doctor/doctorLogin", {
							params: {
								username: user,
								password: pasd
							}
						})
						console.log(res)
						if(res.status==200){
							window.sessionStorage.setItem("id", res.data[0].id)
							window.sessionStorage.setItem("nickname", res.data[0].nickname)
							window.sessionStorage.setItem("username", res.data[0].username)
							window.sessionStorage.setItem("petname", res.data[0].petname)
							window.sessionStorage.setItem("phone", res.data[0].phone)
							window.sessionStorage.setItem('history', res.data[0].history)
							window.sessionStorage.setItem('headphoto', res.data[0].headphoto)
							this.url = res.data[0].headphoto
							this.$router.push("/home1")
						}else{
							Notify('身份或账号或密码错误，请重新输入!');
						}	
				}else{
					Notify('请勾选身份!');
				}

			},
			register() {
				this.$router.push("/register")
			},

		}
	}
</script>

<style scoped="scoped">
	.container {

		height: 660px;
		border: 1px solid white;
		background-color: #9DD4E4;

	}

	.box {

		height: 400px;
		margin-top: 140px;
		text-align: center;
		/* border: 1px solid red; */
	}

	.login {
		border-bottom: 1px solid gray;
	}
	.van-radio{
		margin: auto;
	}
</style>
