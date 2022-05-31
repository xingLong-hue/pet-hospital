<template>
	
		
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>预约和挂号管理</el-breadcrumb-item>
			<el-breadcrumb-item>挂号列表信息</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<div style="text-align: center;">
				<h1>挂号信息</h1>
			</div>
			
			<br>
			<el-table :data="guahaoList" border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="petname" label="宠物姓名"></el-table-column>
				<el-table-column prop="petuser" label="宠物主人"></el-table-column>
				<el-table-column prop="petuser_tel" label="宠物主人电话"></el-table-column>
				<!-- <el-table-column prop="history" label="病史"></el-table-column> -->
				<el-table-column prop="guahao_keshi" label="挂号的科室"></el-table-column>
				<el-table-column prop="doctor" label="挂号的医生"></el-table-column>
				 <el-table-column prop="guahaoTime" label="挂号日期"> </el-table-column>
			    <el-table-column prop="daytime" label="挂号的时间"> </el-table-column>
				<el-table-column prop="time_duan" label="详细的时间段"></el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit_user(scope.row)"></el-button> -->
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_msg(scope.row.id)"></el-button>
							
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
				guahaoList:[],
				time:'',
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
			this.guahaoMsg()
		},
		methods:{
			async guahaoMsg(){
				
				let {
					data: res
				} = await this.$http.get('/guahaoMsg/guahaoMsg', {
					params: this.queryInfo
				})
				console.log(res.data)
				this.total = res.paging.total
				
				this.guahaoList = res.data
				this.formatTime(this.guahaoList)
			
			},
			// 监听pagesize  每页显示的条数的改变
			handleSizeChange(newSizes) {
			
				//给原来变量重新赋值
				this.queryInfo.page_size = newSizes
				//每改变一次重新请求获取新的数据渲染
				this.guahaoMsg()
			},
			// 监听当前页码值的改变  
			handleCurrentChange(newPages) {
				this.queryInfo.page_num = newPages
				this.guahaoMsg()
			},
			async delete_msg(id) {
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
				const {data:res} = await this.$http.delete("/guahaoMsg/delete_guahaoMsg",{data:userid})
				
				// console.log(res)
				
				if (res.status !== 200) {
					return this.$message.error("删除用户失败")
				}else{
					this.$message.success('删除用户成功！')
					// 重新渲染显示界面列表
					this.guahaoMsg()
					// alert("删除成功")
				}
				
			
			},
			formatTime(arr){
				
				let arrs=arr
				console.log(arr)
				for(let i=0;i<arr.length;i++){
					console.log(arr[i].guahaoTime)
					arr[i].guahaoTime=arr[i].guahaoTime.slice(0,10)
					
				}
				
			}
		}
	}
</script>

<style>
</style>
