<template>


	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>宠物档案中心</el-breadcrumb-item>
			<el-breadcrumb-item>宠物档案</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<div style="text-align: center;">
				<h2>宠物档案中心</h2>
			</div>
			<br>
			<el-row :gutter="20">
				<el-col :span="9">
					<el-input placeholder="请输入宠物名字查找" v-model='queryInfo.query_data' clearable @clear="dangAn_Msg">
						<el-button slot="append" icon="el-icon-search" @click="dangAn_Msg"></el-button>
					</el-input>
				</el-col>
			</el-row>
			<br>
			<el-table :data="dangAn_List" border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="petname" label="宠物名"></el-table-column>
				<el-table-column prop="photoUrl" label="宠物图片">
					<template slot-scope="scope">
						<img style="width: 100px; height: 100px" :src="scope.row.photoUrl" alt="这是图片">
					</template>
				</el-table-column>
				<el-table-column prop="petusername" label="宠物主人"></el-table-column>
				<el-table-column prop="phone" label="联系电话"></el-table-column>
				<el-table-column prop="history" label="宠物病史"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_user(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.page_num" :page-sizes="[3, 5, 7, 9]" :page-size="queryInfo.page_size"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>
		
		<!-- 编辑修改的对话框 -->
		<el-dialog title="修改档案信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogClose">
			<el-form :model="edit_form" ref="edit_formRef" label-width="70px" >
				<el-form-item label="昵称">
					<el-input v-model="edit_form.petname"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<template slot-scope="scope">
						<img style="width: 100px; height: 100px" :src="edit_form.photoUrl" alt="图片">
					</template>
				</el-form-item>
				<el-form-item label="主人">
					<el-input v-model="edit_form.petusername"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="edit_form.phone"></el-input>
				</el-form-item>
				<el-form-item label="病史">
					<el-input v-model="edit_form.history"></el-input>
				</el-form-item>
		
			</el-form>
		
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_edit(edit_form)">确 定</el-button>
			</span>
		
		</el-dialog>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				dangAn_List: [],
				// 分页的请求参数
				queryInfo: {
					query_data: '', //查询的参数
					page_num: 1, //当前的页码
					page_size: 3 //每页显示的条数
				},
				total: 0,
				fits: 'fill',
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				editDialogVisible:false,
				edit_form:{},
				
			}
		},
		created() {
			this.dangAn_Msg()
		},
		methods: {
			async dangAn_Msg() {

				let {
					data: res
				} = await this.$http.get('/dangAn/dangAnMsg', {
					params: this.queryInfo
				})
				// console.log(res.data)
				this.total = res.paging.total

				this.dangAn_List = res.data

			},
			// 监听pagesize  每页显示的条数的改变
			handleSizeChange(newSizes) {

				//给原来变量重新赋值
				this.queryInfo.page_size = newSizes
				//每改变一次重新请求获取新的数据渲染
				this.dangAn_Msg()
			},
			// 监听当前页码值的改变  
			handleCurrentChange(newPages) {
				this.queryInfo.page_num = newPages
				this.dangAn_Msg()
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
				let Id=this.$qs.stringify({id})
				const {data:res} = await this.$http.delete("/dangAn/deleteDangAnMsg",{data:Id})
				
				// console.log(res)
				
				if (res.status !== 200) {
					return this.$message.error("删除失败")
				}else{
					this.$message.success('删除成功！')
					// 重新渲染显示界面列表
					this.dangAn_Msg()
					// alert("删除成功")
				}
				
			
			},
			edit_user(row){
				// console.log(row)
				this.editDialogVisible=true
				this.edit_form=row
				
				
			},
			async sure_edit(form){
				// 预校验表单修改的内容
				this.$refs.edit_formRef.validate(async (vaild) => {
					// // 如果为真则可以发起请求 修改用户
					if (!vaild) {
						return
					} else {
						console.log(form)
						// this.editDialogVisible = false
					
						let da_ta=this.$qs.stringify(form)
						let {data:res}=await this.$http.post('/dangAn/updatePet',da_ta)
						if(res.status!==200){
							this.$message.error('修改失败！')
						}else{
							// 关闭添加用户对话框
							this.editDialogVisible = false
							// 重新渲染显示界面列表
							this.dangAn_Msg()
					
							this.$message.success('修改成功！')
						}	
				     }
				
				})
			},
			editDialogClose(){
				this.editDialogVisible=false
				this.$refs.edit_formRef.resetFields()
			}
		
		}
	}
</script>

<style>
</style>
