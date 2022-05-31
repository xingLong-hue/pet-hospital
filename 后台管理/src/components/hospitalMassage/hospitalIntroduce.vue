<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>医院简介和公告管理</el-breadcrumb-item>
			<el-breadcrumb-item>医院简介</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<div class="box">
				<div style="text-align: center;">
					<h1>医院信息简介</h1>
				</div>
				
				<div class="container">
					<el-container>
					  <el-aside width="250px">
						  <img src="../../assets/1.jpg" width="230px" height="350px" alt="">
					  </el-aside>
					  <el-main>
						  <p>  {{poip}}</p>	
						  <br>
						
					  </el-main>
					</el-container>
				</div>
				<div style="text-align: center;">
					 <el-button type="primary" @click="edit_btn()">修改</el-button>
				</div>
			
			</div>
			
		</el-card>
		
		<!-- 编辑修改的对话框 -->
		<el-dialog title="修改简介信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogClose">
			<el-form :model="form" ref="edit_formRef"  label-width="70px" >
				<el-form-item prop="desc_title">
					<el-input type="textarea"  :rows="12" height=200px v-model="form.desc_title"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure_edit(form)">确 定</el-button>
			</span>
		
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        form: {
			  name:'',
			  desc_title: '',
	        },
			poip: '',
			editDialogVisible:false,
		
	      }
	    },
		created(){
			this.getMsg()
		},
	    methods: {
			 async getMsg(){
				  let {data:res}=await this.$http.get("hospital/hospitalMsg")
				  console.log(res.data)
				  // console.log(res.data[0].name)
				  // console.log(res.data[0].introduce)
				  // console.log(res.status)
				  if(res.status==200){
					  // this.Form =  JSON.parse(JSON.stringify(res.data));
					  this.form.name=res.data[0].name
					  // this.desc_title=res.data[0].introduce
					  // this.form.desc_title=res.data[0].introduce
					  this.poip=res.data[0].introduce
					  // console.log(this.desc_title)
				  }
				  
			  },
			  edit_btn(){
				  this.editDialogVisible=true
				  this.form.desc_title=this.poip
			  },
			  editDialogClose(){
				  	this.editDialogVisible=false
			  },
			  async sure_edit(form){
				  // console.log(form) 
				  let formdata={
					  ...form,
					 desc_title:this.desc_title
				  }
				  let da=this.$qs.stringify(form)
				  let {data:res} = await this.$http.put("hospital/update_introduce",da)
				  
				  console.log(res)
				  if(res.status==200){
					  this.editDialogVisible = false
					  this.getMsg()
					  this.$message.success('修改简介信息成功！')   
				  }
			  }
			  
	    }
	  }
</script>

<style scoped="scoped">
	
	h1{
		font-size: 25px;
	}
	.container{
		margin-top: 15px;
	}
	
</style>
