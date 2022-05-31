<template>
	<div class="container">
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="box">
			<van-form @submit="onSubmit(form)">
				<!-- <van-image round width="7rem" height="7rem" src="https://img.yzcdn.cn/vant/cat.jpeg" /> -->
				<br>
				<van-cell-group inset>
					<van-field v-model="form.phone" name="phone" label="电话" placeholder="电话" :rules="rule.phone" />
					<van-field v-model="form.username" name="username" label="用户名" placeholder="用户名"
						:rules="rule.username" />
					<van-field v-model="form.password" type="password" name="密码" label="密码" placeholder="密码"
						:rules="rule.password" />
					<van-field v-model="form.sex" name="sex" label="性别" placeholder="性别"
						:rules="rule.sex" />
					<van-field v-model="form.email" name="email" label="邮箱" placeholder="邮箱"
						:rules="rule.email" />
				</van-cell-group><br>
				<van-radio-group v-model="form.checked" direction="horizontal">
					<van-radio name="1">普通用户</van-radio>
					<van-radio name="2">医生用户</van-radio>
					<!-- <van-radio name="3">护士用户</van-radio> -->
				</van-radio-group>
				<div style="margin: 16px;">
					<van-button round block type="primary" style="background-color:#4DBCFF ;border: none;"
						native-type="submit">注册</van-button>
				</div>
			</van-form>
			<br>

		</div>


	</div>
</template>

<script>
	import {
		Notify
	} from 'vant';
	export default {
		data() {
			// 校验函数可以直接返回一段错误提示
			// const checkphone = (val) => `${val} 不合法，请重新输入`;
			var checkphone = (rule, value) => {
				//验证电话的正则表达式
				const regMobile = /^(0|86| 17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[571])[0-9]{8}$/
				// console.log(rule)
				// console.log(regMobile.test(rule))
				if (!regMobile.test(rule)) {
					return false
				}

			}
			var checkusername = (rule, value) => {
				if (rule.length < 3) {
					return false
				}
			}
			var checkpasd = (rule, value) => {
			
				if (rule.length>=3) {
					return true
				}else{
					return false
				}
			
			}
			var checksex = (rule, value) => {
				// console.log()
			
				if (rule=="男" || rule=="女") {
					return true
				}else{
					return false
				}
				
			}
			var checkEmail = (rule, value) => {
				//验证邮箱的正则表达式
				const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				if (!regEmail.test(rule)) {
					return false
				}
				
			}
			return {
				form: {
					username: '',
					password: '',
					email: '',
					phone: '',
					sex: '',
					checked: ''
				},
				url: '',
				// rule:[
				// 	{ required: true, message: '请填写电话' },{validator:checkphone,message:'输入正确的电话格式', trigger:"onBlur"},
				// ],
				rule: {
					phone: [{
						required: true,
						message: '请填写电话'
					}, {
						validator: checkphone,
						message: '输入正确的电话格式',
						trigger: "onBlur"
					}, ],
					
					username: [{
						required: true,
						message: '请填写用户名'
					}, {
						validator: checkusername,
						message: '用户长度必须大于或等于3位数',
						trigger: "onBlur"
					}],
					password:[
						{
							required: true,
							message: '请填写密码'
						}, {
							validator: checkpasd,
							message: '密码长度必须大于或等于3位数',
							trigger: "onBlur"
						}
					],
					sex: [{required: true,
							message: '请输入性别',
							trigger: 'onBlur'
						},
						{
							validator: checksex,
							message:'请重新正确的性别，男或女！',
							trigger: 'onBlur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'onBlur'
						},
						{
							validator: checkEmail,
							message:'请重新正确的邮箱！',
							trigger: 'onBlur'
						}
					],
				}


			}
		},
		created() {

		},
		methods: {
			onClickLeft() {
				history.back()
			},
			async onSubmit(form) {
				console.log(form)
				// let user=form.username
				let role = form.checked
				console.log(role)
				if (role == 1) {
					let formdata = this.$qs.stringify(form)
					console.log(formdata)
					let {
						data: res
					} = await this.$http.post("/app_users/addUsers", formdata)

					console.log(res)
					if (res.status == 200) {
						this.$router.push("/")

					} else {
						Notify('注册失败!');
					}
				} else if (role == 2) {
					let formdata = this.$qs.stringify(form)
					console.log(formdata)
					let {
						data: res
					} = await this.$http.post("/doctor/addsdoctor", formdata)

					console.log(res)
					if (res.status == 200) {
						this.$router.push("/")

					} else {
						Notify('注册失败!');
					}
				} else {
					Notify('请选择你的角色身份');
				}
			},

		}
	}
</script>

<style scoped="scoped">
	.container {

		height: 660px;
		border: 1px solid white;
		/* background-color: #9DD4E4; */

	}

	.box {

		height: 400px;
		margin-top: 100px;
		text-align: center;
		/* border: 1px solid red; */
	}

	.van-field {
		border-bottom: 1px solid gray;
	}

	.van-radio {
		margin: auto;
	}
</style>
