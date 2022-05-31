<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>系统中心设置</el-breadcrumb-item>
			<el-breadcrumb-item>添加管理员</el-breadcrumb-item>
		
		</el-breadcrumb>
		<el-card style="text-align: center;">
			<!-- <div>
				<h1>系统登录管理中心</h1>
			</div> -->
			<br>
			<h2>请输入新的管理员账号和密码</h2>
			<div style="width: 550px;margin: auto;">
				<el-form :model="form" ref="formRef" label-width="90px">
					<el-form-item label="角色">
						<el-input  v-model="form.role"></el-input>
					</el-form-item>
					<el-form-item label="账号">
						<el-input type="username" v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					
					<el-button type="primary" @click="sure_add(form)">确定添加</el-button>
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
					username:'',
					password:'',
					role:'管理员'
				}

			}
		},
		methods: {
		
			async sure_add(form){
				
				let ada={
					...form
				}
				let formd=this.$qs.stringify(ada)
			
				let {data:res} = await this.$http.post("manage_users/addUser",formd)
			
				if (res.status== 200) {
					this.$message.success('添加新的管理成功！')
					this.form={}
					// this.$router.push("/systemCenter")
				}
				
			}
		}
	}
</script>

<style scoped="scoped">
	.el-form{
		padding: 50px;
	
	}
</style>
