<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item></el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<div style="text-align: center;">
				<h1>欢迎使用宠物医院系统</h1>
				<br>
				<!-- <img src="../assets/5.jpg" alt="" style="width: 100%;height: 550px;"> -->
				<el-row :gutter="12">
					<el-col :span="12">
						<el-card shadow="always">
							<div id="hh" style="width: 550px;height:450px;"></div>
							<p>使用APP的用户数据</p>
						</el-card>
					</el-col>
					<el-col :span="12">
						<el-card shadow="always">
							<div id="hh2" style="width: 550px;height:450px;"></div>
							
							<p>宠物数据</p>
						</el-card>
					</el-col>
			

				</el-row>
			
				
			</div>

		</el-card>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				apptotal:'',
				doctortotal:'',
			


			}
		},
		created() {
			let appUser_total=window.sessionStorage.getItem("appUser_total")
			let doctorUser_total=window.sessionStorage.getItem("doctorUser_total")
			
			
			if(appUser_total==null&&doctorUser_total==null){
				this.apptotal=25
				this.doctortotal=10
			}
			else{
				this.apptotal=appUser_total
			    this.doctortotal=doctorUser_total
			}
			
			console.log(appUser_total)
			console.log(doctorUser_total)

			
		},
		methods: {
		
			myEcharts() {
				

				// 基于准备好的dom，初始化echarts实例
				var myChart = this.$echarts.init(document.getElementById('hh'));
				
				
				// 绘制图表

				var option = {
					series: [{
						type: 'pie',
						data: [{
								value: this.apptotal,
								name: '普通用户'
							},
							{
								value: this.doctortotal,
								name: '医生用户'
							},
						
						]
					}],
					radius: '45%'
				};
				myChart.setOption(option)

			},
			myEcharts2() {

				// 基于准备好的dom，初始化echarts实例
				var myChart = this.$echarts.init(document.getElementById('hh2'));
				// 绘制图表

				var option = {
					xAxis: {
						data: ['小猫', '小狗', '宠鸭', '仓鼠', '宠鸟', '羊驼','仓']
					},
					yAxis: {},
					series: [{
						type: 'bar',
						data: [{
								value: 335,
								name: '小猫'
							},
							{
								value: 234,
								name: '小狗'
							},
							{
								value: 1548,
								name: '宠物鸭'
							},
							{
								value: 1548,
								name: '仓鼠'
							},
							{
								value: 1548,
								name: '宠物鸟'
							},
							{
								value: 1548,
								name: '羊驼'
							},
							{
								value: 1548,
								name: '仓'
							}
							
						]
					}]
				};
				myChart.setOption(option)

			},
		


		},
		mounted() {
			this.myEcharts();
			this.myEcharts2();
		
		}
	}
</script>

<style>
	/* .el-main{
		background-color:#74DFE2;
	} */
</style>
