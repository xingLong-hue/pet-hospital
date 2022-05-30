<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>App用户</el-breadcrumb-item>
			<!-- <el-breadcrumb-item>医生用户</el-breadcrumb-item> -->
		</el-breadcrumb>
		<el-card>
			<el-row :gutter="20">
				<el-col :span="9">
					<el-input placeholder="请输入用户名搜索" v-model='queryInfo.query_data' clearable @clear="getlist">
						<el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
					</el-input>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" @click="addUser" icon="el-icon-circle-plus-outline">添加用户</el-button>
				</el-col>
			</el-row>

			<br>
			<el-table :data="usersList" border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="nickname" label="昵称"></el-table-column>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="password" label="密码"></el-table-column>
				
				<el-table-column prop="sex" label="性别"></el-table-column>
				<el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="phone" label="电话"></el-table-column>
				<el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column prop="petname" label="宠物名字"></el-table-column>
				<el-table-column prop="role" label="角色"></el-table-column>

				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="edit_user(scope.row)">
						</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_user(scope.row.id)">
						</el-button>

					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.page_num" :page-sizes="[5, 8, 10, 15]" :page-size="queryInfo.page_size"
				layout="total, sizes, prev, pager, next, jumper" :total="total">

			</el-pagination>
		</el-card>

		<!-- 编辑修改的对话框 -->
		<el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogClose">
			<el-form :model="edit_form" ref="edit_formRef" :rules="editFormRules" label-width="70px" >
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="edit_form.nickname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="edit_form.password"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="edit_form.sex"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="edit_form.email"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="edit_form.phone"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="edit_form.address"></el-input>
				</el-form-item>

			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_edit(edit_form)">确 定</el-button>
			</span>

		</el-dialog>

		<!-- 添加用户的对话框 -->
		<el-dialog title="添加用户" :visible.sync="AddDialogVisible" width="40%" @close="AddDialogClose">
			<el-form :model="add_form" ref="Add_formRef" :rules="addRules" label-width="70px" >
				<el-form-item label="昵称"  prop="nickname">
					<el-input v-model="add_form.nickname"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="username">
					<el-input v-model="add_form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="add_form.password"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="add_form.sex"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="add_form.email"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="add_form.phone"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="add_form.address"></el-input>
				</el-form-item>
				
				<el-form-item label="角色" prop="role">
					<el-input v-model="add_form.role"></el-input>
				</el-form-item>
		
			</el-form>
		
			<span slot="footer" class="dialog-footer">
				<el-button @click="AddDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_add(add_form)">确 定</el-button>
			</span>
		
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			var checkEmail = (rule, value, callback) => {
				//验证邮箱的正则表达式
				const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				if (regEmail.test(value)) {
					return callback()
				}
				callback(new Error("邮箱格式错误！!!!!"))
			}

			var checkTel = (rule, value, callback) => {
				//验证电话的正则表达式
				const regMobile = /^(0|86| 17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[571])[0-9]{8}$/

				if (regMobile.test(value)) {
					return callback()
				}
				callback(new Error("电话格式错误，请重新输入！"))

			}
			var checkusername = (rule, value, callback) => {
				
				if (value.length>=3) {
					return callback()
				}
				callback(new Error("用户的长度必须大于等于3位数，请重新输入！"))
			
			}
			var pasd = (rule, value, callback) => {
				
			
				if (value.length>=3) {
					return callback()
				}
				callback(new Error("密码长度必须大于3位数，请重新输入！"))
			
			}
			var checknick = (rule, value, callback) => {
				
			
				if (value.length>=3) {
					return callback()
				}
				callback(new Error("昵称的长度必须大于等于3位数，请重新输入！"))
			
			}
			var checksex = (rule, value, callback) => {
				console.log(value)
			
				if (value=="男" || value=="女") {
					return callback()
				}else{
					callback(new Error("请重新正确的性别，男或女！"))
				}
				
			}
			var checkrole = (rule, value, callback) => {
				console.log(value)
			
				if (value=="普通用户") {
					return callback()
				}else{
					callback(new Error("角色身份只能输入为：普通用户！"))
				}
				
			}
			return {
				radio:'1',
				usersList: [],
				// 分页的请求参数
				queryInfo: {
					query_data: '', //查询的参数
					page_num: 1, //当前的页码
					page_size: 5 //每页显示的条数
				},
				total: 0,
				// 修改对话框
				editDialogVisible: false,
				edit_form: {},
				// 修改用户信息的验证规则
				editFormRules: {
					nickname:[
						{
						message: '请输入昵称',
						trigger: 'blur'},
						{
							validator: checknick,
							trigger: 'blur'
						}
					],
					username:[{
						message: '请输入用户名',
						trigger: 'blur'},
						{
							validator: checkusername,
							trigger: 'blur'
						}
					],
					password:[{
						message: '请输入密码',
						trigger: 'blur'},
						{
							validator: pasd,
							trigger: 'blur'
						}
					],
					sex:[{
						message: '请输入性别',
						trigger: 'blur'},
						{
							validator: checksex,
							trigger: 'blur'
						}
					],
					email: [{
							// required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							validator: checkEmail,
							trigger: 'blur'
						}
					],
					phone: [{
							// required: true,
							message: '请输入电话',
							trigger: 'blur'
						},
						{
							validator: checkTel,
							trigger: 'blur'
						}
					]
				},
				
				addRules:{
					nickname:[
						{required: true,
						message: '请输入昵称',
						trigger: 'blur'},
						{
							validator: checknick,
							trigger: 'blur'
						}
					],
					username:[{required: true,
						message: '请输入用户名',
						trigger: 'blur'},
						{
							validator: checkusername,
							trigger: 'blur'
						}
					],
					password:[{required: true,
						message: '请输入密码',
						trigger: 'blur'},
						{
							validator: pasd,
							trigger: 'blur'
						}
					],
					sex:[{required: true,
						message: '请输入性别',
						trigger: 'blur'},
						{
							validator: checksex,
							trigger: 'blur'
						}
					],
					email:[{required: true,
						message: '请输入邮箱',
						trigger: 'blur'},
						{
						type:'email',
						message: '请输入正确的邮箱',
						trigger: 'blur'}
					],
					phone:[{required: true,
						message: '请输入电话',
						trigger: 'blur'},
						{
							validator: checkTel,
							trigger: 'blur'
						}
					
					],
					address:[{required: true,
						message: '请输入地址',
						trigger: 'blur'}
					],
					role:[{required: true,
						message: '请输入身份角色',
						trigger: 'blur'},
						{
							validator: checkrole,
							trigger: 'blur'
						}
					],
					
				},
				// 添加用户的对话框
				AddDialogVisible:false,
				add_form:{
					nickname:'',
					username:'',
					password:'',
					sex:'',
					address:'',
					email:'',
					phone:'',
					role:''
					// petname:''
				},
				
				
			}
		},
		created() {
			this.getlist()
		},
		methods: {

			async getlist() {
				// 获取数据接口的用户列表,参数为需要显示多少条
				// http://localhost:3000/api/app_users/getlist?page_num=1&page_size=2
				let {
					data: res
				} = await this.$http.get('app_users/getlist', {
					params: this.queryInfo
				})
				console.log(res.data)
				this.total = res.paging.total
				window.sessionStorage.setItem("appUser_total",this.total)

				this.usersList = res.data

			},
			edit_user(data) {	
				this.editDialogVisible = true
				this.edit_form = data

			},
			async delete_user(id) {
				const result = await this.$confirm('此操作将永久删除该用户吗, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch((err )=>{
					return err
				} );
				
				// console.log(result)
				
				if(result!='confirm'){
					return this.$message.info("你已取消操作")
				}
				// console.log(id)
				let userid=this.$qs.stringify({id})
				const {data:res} = await this.$http.delete("app_users/delete_appUsers/",{data:userid})
				
				// console.log(res)
				
				if (res.status !== 200) {
					return this.$message.error("删除用户失败")
				}else{
					this.$message.success('删除用户成功！')
					// 重新渲染显示界面列表
					this.getlist()
					// alert("删除成功")
				}
				
			
			},

			addUser() {
				this.AddDialogVisible=true
			},
			// 监听pagesize  每页显示的条数的改变
			handleSizeChange(newSizes) {

				//给原来变量重新赋值
				this.queryInfo.page_size = newSizes
				//每改变一次重新请求获取新的数据渲染
				this.getlist()
			},
			// 监听当前页码值的改变  
			handleCurrentChange(newPages) {
				this.queryInfo.page_num = newPages
				this.getlist()
			},
			editDialogClose() {
				this.$refs.edit_formRef.resetFields()
			},
			async sure_edit(edit_form) {
				// 预校验表单修改的内容
				this.$refs.edit_formRef.validate(async (vaild) => {
					// // 如果为真则可以发起请求 修改用户
					if (!vaild) {
						return
					} else {
						
						let newData={
							id:this.edit_form.id,
							nickname:this.edit_form.nickname,
							pasd:this.edit_form.password,
							email:this.edit_form.email,
							address:this.edit_form.address,
							sex:this.edit_form.sex,
							phone:this.edit_form.phone
						}
						
						let data=this.$qs.stringify({newData})
						
						const {
							data: res
						} = await this.$http.put('app_users/update_appUsers',data)
						
						// console.log(res)
						
						if(res.status!==200){
							this.$message.error('修改失败！')
						}else{
							// 关闭添加用户对话框
							this.editDialogVisible = false
							// 重新渲染显示界面列表
							this.getlist()
					
							this.$message.success('修改成功！')
						}	
				}

				})
			},
			AddDialogClose(){
				this.AddDialogVisible=false
				this.$refs.Add_formRef.resetFields()
			},
			
			async sure_add(add_form_data){	
				// 预校验表单
				this.$refs.Add_formRef.validate(async (vaild) => {
					if(!vaild){
						return
					}else{
						//通过qs处理数据格式
						let datamsg=this.$qs.stringify({add_form_data})
						let {data:res} = await this.$http.post('app_users/add_appUsers',datamsg)
						if(res.status==200){
							// 关闭窗口
							this.AddDialogVisible=false
							this.$refs.Add_formRef.resetFields()
							// 重新渲染显示界面列表
							this.getlist()
							this.$message.success('添加用户成功！')
						}	
					}
				})
			},
		

		}
	}
</script>

<style>


</style>
