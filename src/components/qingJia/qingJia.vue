<template>
	
		
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>请假管理</el-breadcrumb-item>
			<el-breadcrumb-item>请假列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
		
			<br>
			<el-table :data="qingjia_List" border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="time" label="请假时间"></el-table-column>
				<el-table-column prop="howlong" label="请假时长"></el-table-column>
				<el-table-column prop="li_you" label="请假理由"></el-table-column>
				<el-table-column prop="status" label="状态"></el-table-column>
				<el-table-column label="审核是否批准" width="180">
					<template slot-scope="scope">		
						<el-button type="primary" size="mini" round @click="tongyi(scope.row)">批准</el-button>
						<el-button type="danger" size="mini" round @click="no_tongyi(scope.row)">不批准</el-button>
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
				qingjia_List:[],
				// 分页的请求参数
				queryInfo: {
					query_data: '', //查询的参数
					page_num: 1, //当前的页码
					page_size: 3 //每页显示的条数
				},
				total: 0,
				// time:''
			}
		},
		created(){
			this.qingjiaMsg()
		},
		methods:{
			async qingjiaMsg(){
				
				let {
					data: res
				} = await this.$http.get('/qingjia/qingjiaList', {
					params: this.queryInfo
				})
				// console.log(res.data)
				this.total = res.paging.total
				
				this.qingjia_List = res.data
				this.formatTime(this.qingjia_List)

				
			},
			// 监听pagesize  每页显示的条数的改变
			handleSizeChange(newSizes) {
			
				//给原来变量重新赋值
				this.queryInfo.page_size = newSizes
				//每改变一次重新请求获取新的数据渲染
				this.qingjiaMsg()
			},
			// 监听当前页码值的改变  
			handleCurrentChange(newPages) {
				this.queryInfo.page_num = newPages
				this.qingjiaMsg()
			},
			async tongyi(scope){
				console.log(status)
				let form={
					status:"同意批准",
					id:scope.id
				}
				let dat=this.$qs.stringify({form})
				let {
					data: res
				} = await this.$http.put('/qingjia/updata_qingjiaMsg',dat)
				console.log(res)
				if(res.status==200){
					this.qingjiaMsg()
				}
			
			},
			async no_tongyi(scope){
				let form={
					status:"不批准",
					id:scope.id
				}
				let dat=this.$qs.stringify({form})
				let {
					data: res
				} = await this.$http.put('/qingjia/updata_qingjiaMsg',dat)
				console.log(res)
				if(res.status==200){
					this.qingjiaMsg()
				}
			},
			formatTime(arr){
				
				let arrs=arr
				console.log(arr)
				for(let i=0;i<arr.length;i++){
					console.log(arr[i].time)
					arr[i].time=arr[i].time.slice(0,10)
					
				}
				
			}
		}
	}
</script>

<style>
</style>
