<template>

	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>医院简介和公告管理</el-breadcrumb-item>
			<el-breadcrumb-item>公告信息</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<div class="box">
				<h1>这里是医院公告信息栏</h1>
				<div class="container">
					<!-- <el-button @click="add_btn()">发布新的公告</el-button> -->
					<el-table :data="tableData" style="width: 100%">
						<el-table-column type="expand">
							<template slot-scope="props">
								<el-form label-position="left" inline class="demo-table-expand">
									<el-form-item label="公告详细内容:">
										<span>{{ props.row.miaoshu }}</span>
									</el-form-item>

								</el-form>
							</template>
						</el-table-column>
						<el-table-column label="日期" prop="time"></el-table-column>


						<el-table-column label="标题" prop="tit"></el-table-column>
						<!-- <el-table-column label="描述" prop="desc"></el-table-column> -->
						<el-table-column label="操作" prop="action">
							<template slot-scope="props">
								<el-button type="info" @click="update_btn(props.row)">修改</el-button>

								<el-button type="danger" @click="delete_btn(props.row.id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<br>
					<el-button type="primary" @click="add_btn()">发布新的公告</el-button>

				</div>
			</div>
			<br>




		</el-card>

		<!-- 编辑修改的对话框 -->
		<el-dialog title="修改公告信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogClose">
			<el-form :model="edit_form" ref="edit_formRef" label-width="70px">

				<!-- <el-input type=textarea :rows="12" height=200px v-model="edit_form.desc"></el-input> -->
				<el-form-item prop="desc_miaoshu">
					<el-input type="textarea" :rows="12" height=200px v-model="edit_miaoshu"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_edit()">确 定</el-button>
			</span>

		</el-dialog>

		<!-- 添加公告的对话框 -->
		<el-dialog title="发布公告信息" :visible.sync="addDialogVisible" width="30%" @close="addDialogClose">
			<el-form :model="add_form" ref="add_formRef" label-width="100px">

				<el-form-item label="发布时间 :">
					<!-- {{add_form.time}} -->
					<div class="block">
						<!-- <span class="demonstration">默认</span> -->
						<el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
					</div>

					<!-- <el-input v-model="add_form.time"></el-input> -->
				</el-form-item>
				<el-form-item label="发布标题 :">
					<el-input v-model="add_form.tit"></el-input>
				</el-form-item>
				<el-form-item label="发布内容 :">
					<el-input type="textarea" :rows="12" height=200px v-model="add_form.add_miaoshu"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_add(add_form)">确 定</el-button>
			</span>

		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				time: '',
				editDialogVisible: false,
				edit_form: {
					id: '',
					desc_miaoshu: ''
				},
				edit_miaoshu: '',
				add_form: {
					tit: '',
					time: 'ggs',
					add_miaoshu: ''
				},
				addDialogVisible: false,
				add_miaoshu: '',
				nowtime: '',
				// queryInfo: {
				// 	query_data: '',
				// 	page_num: 1, //当前的页码
				// 	page_size: 5 //每页显示的条数
				// },
				// total:0,
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				value1: ''

			}
		},
		created() {
			this.getGongGaoMsg()
		},
		methods: {

			async getGongGaoMsg() {
				let {
					data: res
				} = await this.$http.get('/hospital/hospitalMsg2')
				console.log(res.dataMsg)
				this.tableData = res.dataMsg
				this.time = res.dataMsg[0].time
				this.formatTime(res.dataMsg)

			},
			update_btn(row) {
				console.log(row)
				this.editDialogVisible = true
				this.edit_miaoshu = row.miaoshu
				this.edit_form.id = row.id
			},
			add_btn() {
				this.addDialogVisible = true
				var myDate = new Date();
				var mytime = myDate.toLocaleDateString();
				this.add_form.time = mytime
			},
			async delete_btn(id) {
				// console.log(id)
				let id2 = this.$qs.stringify({
					id
				})

				// console.log(id2)
				let {
					data: res
				} = await this.$http.delete("/hospital/delete_hospitalMsg2", {
					data: id2
				})
				if (res.status == 200) {
					this.$message.success("删除成功")
					this.getGongGaoMsg()
				}
			},
			async sure_edit() {

				let de = {
					...this.edit_form,
					ds: this.edit_miaoshu
				}
				let da = this.$qs.stringify(de)
				console.log(de)
				let {
					data: res
				} = await this.$http.put("hospital/update_hospitalMsg2", da)

				console.log(res)
				if (res.status == 200) {
					this.getGongGaoMsg()
					this.$message.success('修改公告信息成功！')
					this.editDialogVisible = false
				}
			},
			editDialogClose() {
				this.editDialogVisible = false
			},
			async sure_add(add_form) {
				console.log(add_form)
				if (add_form.add_miaoshu == '') {
					
                    this.$message.error('公告不能为空！')
					// this.addDialogVisible = false
				} else {
					let daform = this.$qs.stringify(add_form)
					let {
						data: res
					} = await this.$http.post("hospital/add_hospitalMsg", daform)

					console.log(res)
					if (res.status == 200) {
						this.getGongGaoMsg()
						this.$message.success('发布公告信息成功！')
						this.addDialogVisible = false
					}
				}

			},
			addDialogClose() {
				this.addDialogVisible = false
			},
			formatTime(arr) {
				// console.log(arr)
				for (let i = 0; i < arr.length; i++) {
					console.log(arr[i].time)
					arr[i].time = arr[i].time.slice(0, 10)

				}

			}


		}
	}
</script>

<style scoped="scoped">
	.box {
		text-align: center;
	}

	h1 {
		font-size: 25px;
	}

	.container {
		margin-top: 15px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.is-selected {
		color: #1989FA;
	}
</style>
