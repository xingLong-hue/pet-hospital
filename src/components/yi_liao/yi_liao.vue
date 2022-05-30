<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>常见的治疗方法</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<div style="text-align: center;"><h1>常见的病情及治疗方法</h1></div>
	
			<br>
			<el-table :data="List" border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="title_ming" label="发病名"></el-table-column>
				<el-table-column prop="reason" label="病因"></el-table-column>
				<el-table-column prop="sysbol" label="症状"></el-table-column>
				<el-table-column prop="fangfa" label="治疗方法"></el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="edit_it(scope.row)">
						</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_it(scope.row.id)">
						</el-button>
					
					</template>
				</el-table-column>
			</el-table>
			<br>
			<div style="text-align: center;">
				<el-button type="primary" @click="addit" icon="el-icon-circle-plus-outline">添加</el-button>
			</div>
			
			
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.page_num" :page-sizes="[2, 6, 8, 10]" :page-size="queryInfo.page_size"
				layout="total, sizes, prev, pager, next, jumper" :total="total">

			</el-pagination>
		</el-card>

		<!-- 编辑修改的对话框 -->
		<el-dialog title="修改信息" :visible.sync="editDialogVisible" width="70%" @close="editDialogClose">
			<el-form :model="edit_form" ref="edit_formRef" :rules="editFormRules" label-width="70px" >
				<el-form-item label="发病名">
					<el-input v-model="edit_form.title_ming"></el-input>
				</el-form-item>
				<el-form-item label="病因">
					<el-input v-model="edit_form.reason"></el-input>
				</el-form-item>
				<el-form-item label="症状">
					<el-input v-model="edit_form.sysbol"></el-input>
				</el-form-item>
				<el-form-item label="治疗方法">
					<el-input v-model="edit_form.fangfa"></el-input>
				</el-form-item>
	
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_edit(edit_form)">确 定</el-button>
			</span>

		</el-dialog>

		<!-- 添加用户的对话框 -->
		<el-dialog title="添加的信息" :visible.sync="AddDialogVisible" width="70%" @close="AddDialogClose">
			<el-form :model="add_form" ref="Add_formRef" label-width="70px" >
				<el-form-item label="发病名">
					<el-input v-model="add_form.title_ming"></el-input>
				</el-form-item>
				<el-form-item label="病因">
					<el-input v-model="add_form.reason"></el-input>
				</el-form-item>
				<el-form-item label="症状">
					<el-input v-model="add_form.sysbol"></el-input>
				</el-form-item>
				<el-form-item label="治疗方法">
					<el-input v-model="add_form.fangfa"></el-input>
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
				callback(new Error("邮箱格式错误！"))

			}

			var checkTel = (rule, value, callback) => {
				//验证电话的正则表达式
				const regMobile = /^(0|86| 17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[571])[0-9]{8}$/

				if (regMobile.test(value)) {
					return callback()
				}
				callback(new Error("电话格式错误，请重新输入！"))

			}
			return {
				List: [],
				// 分页的请求参数
				queryInfo: {
					query_data: '', //查询的参数
					page_num: 1, //当前的页码
					page_size: 2 //每页显示的条数
				},
				total: 0,
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
				// 添加的对话框
				AddDialogVisible:false,
				add_form:{
					title_ming:'',
					reason:'',
					sysbol:'',
					fangfa:'',
				},
				
				
			}
		},
		created() {
			this.getlist()
		},
		methods: {

			async getlist() {
			
				let {data:res}=await this.$http.get('yi_liao/yi_liaoMsg2',{
					params: this.queryInfo
				})
				console.log(res.data)
				this.total = res.paging.total

				this.List = res.data

			},
			edit_it(data) {	
				this.editDialogVisible = true
				this.edit_form = data

			},
			async delete_it(id) {
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
				let Id=this.$qs.stringify({id})
				const {data:res} = await this.$http.delete("yi_liao/delete_yiliaoMsg/",{data:Id})
				
				// console.log(res)
				
				if (res.status !== 200) {
					return this.$message.error("删除失败")
				}else{
					this.$message.success('删除成功！')
					// 重新渲染显示界面列表
					this.getlist()
					// alert("删除成功")
				}
				
			
			},

			addit() {
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
			sure_edit(edit_form) {
				// 预校验表单修改的内容
				this.$refs.edit_formRef.validate(async (vaild) => {
					// // 如果为真则可以发起请求 修改用户
					if (!vaild) {
						return
					} else {
						
						let newData={
							id:this.edit_form.id,
							title:this.edit_form.title_ming,
							reason:this.edit_form.reason,
							fangfa:this.edit_form.fangfa,
							sysbol:this.edit_form.sysbol,
						}
						
						let data=this.$qs.stringify({newData})
						console.log(newData)
						const {
							data: res
						} = await this.$http.put('yi_liao/update_yiliaoMsg',data)
						
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
				
				// console.log(add_form_data)
				if(add_form_data.fangfa==''&&add_form_data.reason==''&&add_form_data.sysbol==''&&add_form_data.title_ming==''){
					this.$message.error("内容不能为空")
				}else{
					let datamsg=this.$qs.stringify(add_form_data)
					// console.log(datamsg)
					let {data:res} = await this.$http.post('yi_liao/add_yiliaoMsg',datamsg)
					
					// console.log(res)
					
					if(res.status==200){
						// 关闭窗口
						this.AddDialogVisible=false
						
						// 重新渲染显示界面列表
						this.getlist()
						this.$message.success('添加成功！')
						this.$refs.Add_formRef.resetFields()
					}
				}
				
				
					
				
			},
		

		}
	}
</script>

<style>


</style>
