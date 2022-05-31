<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>系统中心设置</el-breadcrumb-item>
			<el-breadcrumb-item>管理员列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card style="text-align: center;">
			<el-table :data="manageUsers" border >
				<el-table-column type="index" label="#" align="center"></el-table-column>
				<el-table-column prop="username" label="账号" align="center"></el-table-column>
				<el-table-column prop="password" label="密码" align="center"></el-table-column>
				<el-table-column prop="role" label="角色" align="center"></el-table-column>
				<el-table-column label="操作" width="280">
					<template slot-scope="scope">
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_user(scope.row.id)"></el-button>
				
					</template>
				</el-table-column>
			</el-table>
			
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.page_num"
			 :page-sizes="[5, 8, 10, 15]" :page-size="queryInfo.page_size" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	export default{
		
		data(){
			return {
				manageUsers:[],
				queryInfo: {
					query_data: '',
					page_num: 1, //当前的页码
					page_size: 5 //每页显示的条数
				},
				total:0,
			}
		},
		created(){
			this.getlist()
		},
		methods:{
			async getlist(){
				let {data:res} = await this.$http.get('manage_users/list',{params:this.queryInfo})
				// console.log(res.data)
				this.total=res.paging.total
				
				this.manageUsers=res.data
			},
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
			async delete_user(id) {
				
				if(id==1){
					this.open()
				}else{
					const result = await this.$confirm('此操作将永久删除该用户吗, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).catch((err )=>{
						return err
					} );
					
					if(result!='confirm'){
						return this.$message.info("你已取消操作")
					}
					// console.log(id)
					let userid=this.$qs.stringify({id})
					const {data:res} = await this.$http.delete("manage_users/delete_manage_users/",{data:userid})
					
					// console.log(res)
					
					if (res.status !== 200) {
						return this.$message.error("删除用户失败")
					}else{
						this.$message.success('删除用户成功！')
					
						this.getlist()
						
					}
				}
				
			},
			
			open() {
			        const h = this.$createElement;
			        this.$msgbox({
			          title: '友好提示',
			          message: h('p', null, [
			            h('span', null, '这是超级管理员不可删除 '),
			            // h('i', { style: 'color: teal' }, 'VNode')
			          ]),
			          // showCancelButton: true,
			          confirmButtonText: '确定',
			          // cancelButtonText: '取消',
			        
			        })
				}
		}
	}
</script>

<style>
</style>
