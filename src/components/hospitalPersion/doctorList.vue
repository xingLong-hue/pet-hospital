<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>医院人员管理</el-breadcrumb-item>
			<el-breadcrumb-item>医生的信息</el-breadcrumb-item>
			
		</el-breadcrumb>
		<el-card>
			<el-row :gutter="20">
				<el-col :span="9">
					<el-input placeholder="请输入内容" v-model='queryInfo.query_data' clearable @clear="getuser">
						<el-button slot="append" icon="el-icon-search" @click="getuser"></el-button>
					</el-input>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline">添加用户</el-button>
				</el-col>
			</el-row>
			<br>
			<el-table :data="doctorUsers" border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="username" label="姓名"></el-table-column>
				<el-table-column prop="age" label="年龄"></el-table-column>
				<el-table-column prop="sex" label="性别"></el-table-column>
				<el-table-column prop="ke_shi" label="科室"></el-table-column>
				<el-table-column prop="phone" label="电话"></el-table-column>
				<el-table-column prop="zhi_wei" label="职位"></el-table-column>
				<el-table-column prop="shan_chang" label="擅长"></el-table-column>
				
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="edit_user(scope.row)"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_user(scope.row.id)"></el-button>
			
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.page_num"
			 :page-sizes="[5, 8, 10, 15]" :page-size="queryInfo.page_size" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
			
			<!-- 编辑修改的对话框 -->
			<el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
				<el-form :model="edit_form" ref="edit_formRef" :rules="addRules" label-width="70px" >
					<el-form-item label="姓名">
						<el-input v-model="edit_form.username"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-input v-model="edit_form.sex"></el-input>
					</el-form-item>
					<el-form-item label="年龄">
						<el-input v-model="edit_form.age"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="phone">
						<el-input v-model="edit_form.phone"></el-input>
					</el-form-item>
					<el-form-item label="科室">
						<el-input v-model="edit_form.ke_shi"></el-input>
					</el-form-item>
					<el-form-item label="职位">
						<el-input v-model="edit_form.zhi_wei"></el-input>
					</el-form-item>
					<el-form-item label="擅长">
						<el-input v-model="edit_form.shan_chang"></el-input>
					</el-form-item>
			
				</el-form>
			
				<span slot="footer" class="dialog-footer">
					<el-button @click="editDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="sure_edit(edit_form)">确 定</el-button>
				</span>
			
			</el-dialog>
			
			
			<!-- 添加用户的对话框 -->
			<el-dialog title="医生信息" :visible.sync="AddDialogVisible" width="50%" @close="AddDialogClose">
				<el-form :model="add_form" ref="Add_formRef" :rules="addRules" label-width="70px" >
					<el-form-item label="姓名" prop="username">
						<el-input v-model="add_form.username"></el-input>
					</el-form-item>
					<el-form-item label="年龄" prop="age">
						<el-input v-model="add_form.age"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-input v-model="add_form.sex"></el-input>
					</el-form-item>
					<el-form-item label="科室" prop="keshi">
						<el-input v-model="add_form.ke_shi"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="phone">
						<el-input v-model="add_form.phone"></el-input>
					</el-form-item>
					<el-form-item label="职位" prop="zhiwei">
						<el-input v-model="add_form.zhi_wei"></el-input>
					</el-form-item>
					<el-form-item label="擅长">
						<el-input v-model="add_form.shan_chang"></el-input>
					</el-form-item>
				</el-form>
			
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="sure_add(add_form)">确 定</el-button>
				</span>
			
			</el-dialog>
			
			
			
			
			
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
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
			var checkage = (rule, value, callback) => {
				
			
				if (value.length!=="") {
					return callback()
				}
				callback(new Error("请输入年龄！"))
			
			}
			var checkkeshi = (rule, value, callback) => {
				
			
				if (value.length!=="") {
					return callback()
				}
				callback(new Error("科室不能为空！"))
			
			}
			var checksex = (rule, value, callback) => {
				console.log(value)
			
				if (value=="男" || value=="女") {
					return callback()
				}else{
					callback(new Error("请重新正确的性别，男或女！"))
				}
				
			}
			var checkzhiwei = (rule, value, callback) => {
				console.log(value)
			
				if (value!=="") {
					return callback()
				}else{
					callback(new Error("请输入职位！"))
				}
				
			}
			return {
				doctorUsers:[],
				// 请求参数
				queryInfo: {
					query_data: '',
					page_num: 1, //当前的页码
					page_size: 5 //每页显示的条数
				},
				total:0,
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
					role:'',
					shan_chang:''
				
				},
				// 修改对话框
				editDialogVisible: false,
				edit_form: {},
				// 修改用户信息的验证规则
				editFormRules: {
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							validator: checkEmail,
							trigger: 'blur'
						}
					],
					phone: [{
							required: true,
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
					keshi:[
						{required: true,
						message: '请输入科室',
						trigger: 'blur'},
						{
							validator: checkkeshi,
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
					age:[{required: true,
						message: '请输入密码',
						trigger: 'blur'},
						{
							validator: checkage,
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
					zhiwei:[{required: true,
						message: '请输入职位',
						trigger: 'blur'},
						{
							validator: checkzhiwei,
							trigger: 'blur'
						}
					],
				}
				
			}
		},
		created(){
			this.getuser()
		},
		methods:{
			// 发起请求获取医院人员数据
			async getuser(){
				
				let {data:res}=await this.$http.get('/doctor/doctormsg',{
					params: this.queryInfo
				})
			
				if(res.status==200){
					this.total = res.paging.total
					this.doctorUsers=res.data
				}
			},
		
			handleSizeChange(newSizes) {
				this.queryInfo.page_size = newSizes
	
				this.getuser()
			},
			handleCurrentChange(newPages) {
				this.queryInfo.page_num = newPages
				this.getuser()
			},
			AddDialogClose(){
				this.AddDialogVisible=false
			},
			add(){
				this.AddDialogVisible=true
			},
			async sure_add(add_form_data){
				
				console.log(add_form_data)
				this.$refs.Add_formRef.validate(async (vaild) => {
					if(!vaild){
						return
					}else{
						let datamsg=this.$qs.stringify({add_form_data})
						console.log(datamsg)
						let {data:res} = await this.$http.post('/doctor/add_doctotlistMsg',datamsg)
						
						console.log(res)
						
						if(res.status==200){
						// 	// 关闭窗口
							this.AddDialogVisible=false
							this.$refs.Add_formRef.resetFields()
						// 	// 重新渲染显示界面列表
							this.getuser()
							this.$message.success('添加用户成功！')
							
						}
					}
				})
					
				
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
				
				const {data:res} = await this.$http.delete("/doctor/delete_doctorlistMsg/",{data:userid})
				
				// console.log(res)
				
				if (res.status !== 200) {
					return this.$message.error("删除失败")
				}else{
					this.$message.success('删除成功！')
					// 重新渲染显示界面列表
					this.getuser()
					// alert("删除成功")
				}

			},
			edit_user(data) {
				this.editDialogVisible = true
				this.edit_form = data
			
			},
			editDialogClose() {
				this.$refs.edit_formRef.resetFields()
			},
			sure_edit(edit_form) {
				// 预校验表单修改的内容
				this.$refs.edit_formRef.validate(async (vaild) => {
					// // 如果为真则可以发起请求 修改用户
					if (!vaild) {
						return
					} else {
						
						let newData={
							id:this.edit_form.id,
							username:this.edit_form.username,
							sex:this.edit_form.sex,
							age:this.edit_form.age,
							phone:this.edit_form.phone,
							keshi:this.edit_form.ke_shi,
							zhiwei:this.edit_form.zhi_wei,
							shan_chang:this.edit_form.shan_chang
						}
						
						let data=this.$qs.stringify({newData})
						
						const {
							data: res
						} = await this.$http.put('/doctor/UpdatedoctorlistMsg',data)
						
						console.log(res)
						
						if(res.status!==200){
							this.$message.error('修改失败！')
						}else{
							// 关闭添加用户对话框
							this.editDialogVisible = false
							// 重新渲染显示界面列表
							this.getuser()
					
							this.$message.success('修改成功！')
						}	
				}
			
				})
			},
			
			
		}
	}
</script>

<style>
	
	
</style>
