<template>
	<div class="container">
		<div class="box">
			<el-card class="box-card card_size">
				<h1>宠物医院管理系统</h1>
				<el-form :model="Form" status-icon ref="ref_Form" label-width="60px"
					class="demo-ruleForm" >
					<el-form-item label="账号" >
						<el-input type="text" v-model="Form.username" placeholder="请输入用户名" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" >
						<el-input type="password" v-model="Form.password" placeholder="请输入密码" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm(Form)" class="login_button">登录</el-button>
					</el-form-item>
					
				</el-form>
				<!-- <a href="">没有账号？去注册一个</a> -->
			</el-card>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			var validateusername=(rule, value, callback) => {
					if (value === '') {
					  callback(new Error('账号不能为空'));
					} else {
					 //  if (this.ruleForm.checkPass !== '') {
						this.$refs.ref_Form.validateField('username');
					 //  }
					  callback();
					}
				};
			var validatepasssword=(rule, value, callback) => {
					if (value === '') {
					  callback(new Error('密码不能为空'));
					} else {
					 //  if (this.ruleForm.checkPass !== '') {
						this.$refs.ref_Form.validateField('password');
					 //  }
					  callback();
					}
				};
			
			return {
				Form: {
					username: '',
					password:''
				},
	
				// 接收数据传回来的数据，用户和密码
				database_username:'',
				database_password:'',
				// rule:{
				// 	username:[
				// 		{  validator: validateusername, trigger: 'blur' },
				// 		{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
				// 		],
				// 	password:[
				// 		{ validator: validatepasssword, trigger: 'blur' },
				// 		{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
					
				// }
					
				
			};
		},
		methods: {
			submitForm(form) {
	
				this.getAdmin()
			
			},
			
			async getAdmin(){
				
				// console.log(this.Form.username)
				// console.log(this.Form.password)
				// 发送请求，获取数据库里的信息
				if(this.Form.username==''&&this.Form.password==''){
					this.$message.error('账号、密码不能为空');
				}else if(this.Form.username==''){
					this.$message.error('账号不能为空');
				}
				else if(this.Form.password==''){
					this.$message.error('密码不能为空');
				}
				else{
					
					let url=`manage_users/login?username=${this.Form.username}&password=${this.Form.password}`
					// console.log(url)
					
					let {data:res} = await this.$http.get(url)
					// console.log(res)
					
					if(res.status==200){
						let user=res.data[0].username
						let pasd=res.data[0].password
						window.sessionStorage.setItem("user",user)
						window.sessionStorage.setItem("pasd",pasd)
						this.$message.success('登录成功！');
						//延迟1000毫秒	//跳转到首页的界面
						setTimeout(()=> {
						  this.$router.push('index'); //路由跳转用户中心
						}, 1000);
						window.sessionStorage.setItem("token", res.tokenkey);
						
					}else{
						// console.log("登录失败！！！！！！！！")
						this.$message.error('账号或密码错误，请重新输入！');
					}
					
				}
				
				
			
				
			}
		}
	}
</script>

<style scoped="scoped">
	.container{
		width: 100%;
		height: 740px;
		background: url(../assets/8.jpg) no-repeat;
		background-size: 100% 100%;
	}
	.text {
		font-size: 14px;
	}

	.item {
		padding: 18px 0;
	}
	.card_size{
		width: 450px;
		top: 50%;
		left: 50%;
		transform: translate(870px,160px);
		text-align: center;
	}
	.demo-ruleForm{
		/* border: 1px solid red; */
		padding-top: 10px;
		padding-right: 35px;
	}
	.login_button{
		width: 250px;
	}

</style>
