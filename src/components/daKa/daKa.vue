<template>
	
		
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>打卡记录</el-breadcrumb-item>
			<el-breadcrumb-item>打卡记录列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<br>
			<el-table :data="daka_List" border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="status" label="状态"></el-table-column>
				<el-table-column prop="time" label="日期"><!-- {{daka_List.time|dataformat}} --></el-table-column>
				
				<el-table-column label="操作" prop="action">
					<template slot-scope="props">
						<!-- <el-button type="info" @click="update_btn(props.row)">修改</el-button> -->
						<el-button type="danger" @click="delete_btn(props.row.id)">删除</el-button>
					</template>
				</el-table-column>
		
			</el-table>
			
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.page_num" :page-sizes="[3, 5, 7, 9]" :page-size="queryInfo.page_size"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			
			</el-pagination>
		</el-card>
		
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				daka_List:[],
				// 分页的请求参数
				queryInfo: {
					query_data: '', //查询的参数
					page_num: 1, //当前的页码
					page_size: 3 //每页显示的条数
				},
				total: 0,
			}
		},
		created(){
			this.dakaMsg()
		},
		methods:{
			async dakaMsg(){
				
				let {
					data: res
				} = await this.$http.get('/daka/dakaMsg', {
					params: this.queryInfo
				})
				console.log(res.data)
				this.total = res.paging.total
				
				this.daka_List = res.data
				this.formatTime(this.daka_List)

				
			},
			// 监听pagesize  每页显示的条数的改变
			handleSizeChange(newSizes) {
			
				//给原来变量重新赋值
				this.queryInfo.page_size = newSizes
				//每改变一次重新请求获取新的数据渲染
				this.dakaMsg()
			},
			// 监听当前页码值的改变  
			handleCurrentChange(newPages) {
				this.queryInfo.page_num = newPages
				this.dakaMsg()
			},
			formatTime(arr){
				
				console.log(arr)
				for(let i=0;i<arr.length;i++){
					console.log(arr[i].time)
					arr[i].time=arr[i].time.slice(0,10)
					
				}
				
			},
			async delete_btn(id){
				let id2=this.$qs.stringify({id})
				
				// console.log(id2)
				// let {data:res} = await this.$http.delete("/daka/delete_dakaMsg",{data:id2})
				// if(res.status==200){
				// 	this.$message.success("删除成功")
				// 	this.dakaMsg()
				// }
				
				
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
				let {data:res} = await this.$http.delete("/daka/delete_dakaMsg",{data:id2})
				if(res.status==200){
					this.$message.success("删除成功")
					this.dakaMsg()
				}else{
					this.$message.success('删除失败！')
					// 重新渲染显示界面列表
					this.dakaMsg()
					// alert("删除成功")
				}
				
				
				
				
				
				
			}
		
		}
	}
</script>

<style>
</style>
