<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>系统中心设置</el-breadcrumb-item>
			<el-breadcrumb-item>修改密码</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card style="text-align: center;">
			<div>
				<h1>系统登录管理中心</h1>
			</div>
			<div style="width: 550px;margin: auto;">
				<el-form :model="form" ref="formRef" label-width="90px">
					<el-form-item label="原来的密码">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="新的密码">
						<el-input type="password" v-model="form.password2"></el-input>
					</el-form-item>
					<el-button type="primary" @click="sure_add(form)">确定修改</el-button>
				</el-form>
			</div>

		</el-card>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					password:'',
					password2:''
				}

			}
		},
		methods: {
		
			async sure_add(form){
				// 修改成功退出系统，重新登录	
				let username=window.sessionStorage.getItem("user")
				let pasd=window.sessionStorage.getItem('pasd')
				let formdata={
					...form,
					username
				}
				console.log(formdata)	
				let formd=this.$qs.stringify(formdata)
				if(form.password!==pasd){
					this.$message.error('原密码错误，请重新输入！');
				}else{
					
					let {data:res}=await this.$http.post("/systemCenter/alterPassword",formd)
					console.log(res)
					if (res.status== 200) {
						this.$message.success('修改密码成功！')
						this.$router.push("/login")
					}else{
						this.$message.error('修改密码失败');
					}	
				}
			}
			
		}
	}
</script>

<style>
	.el-form{
		padding: 50px;
	
	}
</style>
