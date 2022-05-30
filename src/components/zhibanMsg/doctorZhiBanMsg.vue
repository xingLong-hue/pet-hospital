<template>
	<div class>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>值班信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>医生值班安排</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 列表 -->

		<el-card class="box-card">
			<br>
			<div class="search">
				<el-button type="info" @click="lastweek">上一周</el-button>
				<el-button type="primary" @click="addDialogVisible = true" class="addbtn">新增排班</el-button>
				<el-button type="info" @click="nextweek">下一周</el-button>
				<br><br>

				<div>
					<span>{{nextMonday}}</span>
					<span>星期一</span>
					<span>~</span>
					<span>{{lastsunday}}</span>
					<span>星期天</span>
				</div>
			</div>
			<br>
			<!-- 信息 -->
			<el-table :data="tableData" stripe border @selection-change="handleSelectionChange">
				<el-table-column show-overflow-tooltip label="医生" prop="username" align="center">
					<template slot-scope="scope">{{scope.row.username}}</template>
				</el-table-column>

				<el-table-column show-overflow-tooltip :label="monday1" prop="mondayStatus" align="center" width="175">
				</el-table-column>
				<el-table-column show-overflow-tooltip :label="thursday1" prop="tuesdayStatus" align="center"
					width="175"></el-table-column>
				<el-table-column show-overflow-tooltip :label="wednesday1" prop="wednesdayStatus" align="center"
					width="175"></el-table-column>
				<el-table-column show-overflow-tooltip :label="thuesday1" prop="thursdayStatus" align="center"
					width="175"></el-table-column>
				<el-table-column show-overflow-tooltip :label="friday1" prop="fridayStatus" align="center" width="175">
				</el-table-column>
				<el-table-column show-overflow-tooltip :label="saturday1" prop="saturdayStatus" align="center"
					width="175"></el-table-column>
				<el-table-column show-overflow-tooltip :label="sunday1" prop="sundayStatus" align="center" width="175">
				</el-table-column>
				<el-table-column show-overflow-tooltip label="操作" align="center" width="175">
					<template slot-scope="scope">
						<el-button type="primary" size="small" @click="showEditDialog(scope.row)">修改</el-button>
						<el-button type="danger" size="small" @click="removeUserById(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="Info.page_num" :page-sizes="[5,7,9]" :page-size="Info.page_size"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>
		<el-dialog title="修改值班信息" :visible.sync="editDialogVisible" width="45%" @close="editDialogClose">
			<el-form :model="edit_form" ref="edit_formRef" label-width="70px">
				<el-form-item label="姓名">
					<el-input v-model="edit_form.username" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="星期一">
					<el-input v-model="edit_form.mondayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期二">
					<el-input v-model="edit_form.tuesdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期三">
					<el-input v-model="edit_form.wednesdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期四">
					<el-input v-model="edit_form.thursdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期五">
					<el-input v-model="edit_form.fridayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期六">
					<el-input v-model="edit_form.saturdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期天">
					<el-input v-model="edit_form.sundayStatus"></el-input>
				</el-form-item>


			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_edit(edit_form)">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="增加值班人员" :visible.sync="addDialogVisible" width="45%" @close="addDialogClose">
			<el-form v-model="add_form" ref="add_formRef" label-width="70px">
				<el-form-item label="姓名">
					<el-input v-model="add_form.username"></el-input>
				</el-form-item>
				<el-form-item label="星期一">
					<el-input v-model="add_form.mondayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期二">
					<el-input v-model="add_form.tuesdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期三">
					<el-input v-model="add_form.wednesdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期四">
					<el-input v-model="add_form.thursdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期五">
					<el-input v-model="add_form.fridayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期六">
					<el-input v-model="add_form.saturdayStatus"></el-input>
				</el-form-item>
				<el-form-item label="星期天">
					<el-input v-model="add_form.sundayStatus"></el-input>
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
				base: "",
				monday: "",
				today: "",
				dateFormat2: "",
				dateFormat8: "",
				nextMonday: "",
				lastsunday: "",
				role: false,
				homes: [],
				workers: [],

				tableData: [],
				title: "新增",
				dialogVisible: false,
				form: {},
				formRules: {},
				monday1: '星期一',
				thuesday1: '星期二',
				wednesday1: '星期三',
				thursday1: '星期四',
				friday1: '星期五',
				saturday1: '星期六',
				sunday1: '星期天',
				// 分页
				Info: {
					page_num: 1, //当前的页码
					page_size: 5 //每页显示的条数
				},
				total: 0,
				editDialogVisible: false,
				edit_form: [],
				addDialogVisible: false,
				add_form: {
					mondayStatus: '',
					tuesdayStatus: '',
					wednesdayStatus: '',
					thursdayStatus: '',
					fridayStatus: '',
					saturdayStatus: '',
					sundayStatus: '',
				}

			};
		},
		created() {
			this.getuser()
		},

		mounted() {
			this.getTime()

		},
		methods: {
			async getuser() {

				let {
					data: res
				} = await this.$http.get('/zhiban/zhibanmsg', {
					params: this.Info
				})
				console.log(res)
				if (res.status == 200) {
					this.total = res.paging.total
					this.tableData = res.data
				}

			},
			lastweek() {
				this.getBeforNday(this.base, 7);
				console.log(this.dateFormat2);
				this.getuser();
			},
			nextweek() {
				this.getBeforNday(this.base, -7);
				console.log(this.dateFormat2);
				this.getuser();
			},
			getTime() {
				var myDate = new Date();
				var year = myDate.getFullYear(); //年
				var month = myDate.getMonth() + 1; //月
				var date = myDate.getDate(); //日
				var str = myDate.getDay();

				if (str == 1) {
					this.getBeforNday(myDate, 1);
				}
				if (str == 2) {
					this.getBeforNday(myDate, 2);
				}
				if (str == 3) {
					this.getBeforNday(myDate, 3);
				}
				if (str == 4) {
					this.getBeforNday(myDate, 4);
				}
				if (str == 5) {
					this.getBeforNday(myDate, 5);
				}
				if (str == 6) {
					this.getBeforNday(myDate, 6);
				}
				if (str == 0) {
					this.getBeforNday(myDate, 0);
				}
			},
			getBeforNday(date, n) {
				var todays = date.getTime();
				var today = new Date();
				this.today = today.setTime(todays);

				var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24;
				var yesterday = new Date();

				yesterday.setTime(yesterday_milliseconds);

				var strYear = yesterday.getFullYear();
				var strDay = yesterday.getDate();
				var strMonth = yesterday.getMonth() + 1;
				var strdate = yesterday.getDay();

				if (strdate == 0) {}
				if (strMonth < 10) {
					strMonth = "0" + strMonth;
				}
				let datastr = strYear + "年" + strMonth + "月" + strDay + "日";
				let md = strMonth + "-" + strDay;
				this.sunday = md;
				this.lastsunday = datastr;
				this.dateFormat1 = strYear + "-" + strMonth + "-" + strDay;
				this.base = yesterday;
				this.getotherday(yesterday, -1);
				this.getotherday(yesterday, -2);
				this.getotherday(yesterday, -3);
				this.getotherday(yesterday, -4);
				this.getotherday(yesterday, -5);
				this.getotherday(yesterday, -6);
				this.getotherday(yesterday, -7);
			},
			getotherday(date, n) {
				var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24;
				var yesterday = new Date();
				yesterday.setTime(yesterday_milliseconds);

				var strYear = yesterday.getFullYear();
				var strDay = yesterday.getDate();
				var strMonth = yesterday.getMonth() + 1;
				var strdate = yesterday.getDay();
				if (strMonth < 10) {
					strMonth = "0" + strMonth;
				}
				if (strDay < 10) {
					strDay = "0" + strDay;
				}
				if (n == -1) {
					this.monday = strMonth + "." + strDay;
					this.monday1 =
						"星期一" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
					this.nextMonday = strYear + "年" + strMonth + "月" + strDay + "日";
					this.dateFormat2 =
						strYear + "-" + strMonth + "-" + strDay + " " + "00:00:00";
				}
				if (n == -2) {
					this.thursday = strMonth + "." + strDay;
					this.thursday1 =
						"星期二" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
					this.dateFormat3 = strYear + "-" + strMonth + "-" + strDay;
				}
				if (n == -3) {
					this.wednesday = strMonth + "." + strDay;
					this.wednesday1 =
						"星期三" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
					this.dateFormat4 = strYear + "-" + strMonth + "-" + strDay;
				}
				if (n == -4) {
					this.thuesday = strMonth + "." + strDay;
					this.thuesday1 =
						"星期四" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
					this.dateFormat5 = strYear + "-" + strMonth + "-" + strDay;
				}
				if (n == -5) {
					this.friday = strMonth + "." + strDay;
					this.friday1 =
						"星期五" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
					this.dateFormat6 = strYear + "-" + strMonth + "-" + strDay;
				}
				if (n == -6) {
					this.saturday = strMonth + "." + strDay;
					this.saturday1 =
						"星期六" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
					this.dateFormat7 = strYear + "-" + strMonth + "-" + strDay;
				}
				if (n == -7) {
					this.sunday = strMonth + "." + strDay;
					this.sunday1 =
						"星期天" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
					this.lastsunday = strYear + "年" + strMonth + "月" + strDay + "日";
					this.dateFormat8 =
						strYear + "-" + strMonth + "-" + strDay + " " + "00:00:00";
				}
			},

			handleSelectionChange(val) {
				this.checkedList = val;
			},

			// 监听pagesize  每页显示的条数的改变
			handleSizeChange(newSizes) {

				//给原来变量重新赋值
				this.Info.page_size = newSizes
				//每改变一次重新请求获取新的数据渲染
				this.getuser()

			},
			// 监听当前页码值的改变  
			handleCurrentChange(newPages) {
				this.Info.page_num = newPages
				this.getuser()
			},
			showEditDialog(row) {
				this.editDialogVisible = true
				this.edit_form = row
				// console.log("scope-row",row)
				// console.log("this.edit_form",this.edit_form)


			},
			editDialogClose() {
				this.editDialogVisible = false
			},
			sure_edit(edit_form) {
				// 预校验表单修改的内容
				this.$refs.edit_formRef.validate(async (vaild) => {
					// // 如果为真则可以发起请求 修改用户
					if (!vaild) {
						return
					} else {
						let newData = {
							id: edit_form.id,
							mondayStatus: edit_form.mondayStatus,
							tuesdayStatus: edit_form.tuesdayStatus,
							wednesdayStatus: edit_form.wednesdayStatus,
							thursdayStatus: edit_form.thursdayStatus,
							fridayStatus: edit_form.fridayStatus,
							saturdayStatus: edit_form.saturdayStatus,
							sundayStatus: edit_form.sundayStatus,

						}
						console.log(newData)
						let data = this.$qs.stringify(newData)

						const {
							data: res
						} = await this.$http.put('/zhiban/update_zhibanMsg', data)

						console.log(res)

						if (res.status !== 200) {
							this.$message.error('修改失败！')
						} else {
							this.editDialogVisible = false
							// 重新渲染显示界面列表
							this.getuser()

							this.$message.success('修改成功！')
						}
					}
				})

			},

			async sure_add(add_form) {
				

				if (add_form.sundayStatus!=='') {
					let add_form_data = this.$qs.stringify(add_form)
					console.log(this.add_form)
					const {
						data: res
					} = await this.$http.post('/zhiban/insert_zhibanMsg', add_form_data)

					console.log(res)
					if (res.status == 200) {
						this.$message.success('添加排班成功！')
						this.addDialogVisible = false
					}
				}else{
					alert("不能为空，请填写值班信息")
				}




			},
			addDialogClose() {
				this.addDialogVisible = false
			},
			async removeUserById(id){
				const result = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
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
				const {data:res} = await this.$http.delete("/zhiban/delete_zhibanMsg/",{data:userid})
				
				// console.log(res)
				
				if (res.status !== 200) {
					return this.$message.error("删除失败")
				}else{
					this.$message.success('删除成功！')
					// 重新渲染显示界面列表
					this.getuser()
					// alert("删除成功")
				}
				
			}





		},

		// https://www.cnblogs.com/limexee/p/13066206.html
	};
</script>
<style scoped>

</style>
