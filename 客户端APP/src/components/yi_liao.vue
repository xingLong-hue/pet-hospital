<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="content">
			<div style="text-align: center;">
				<h3>常见病情的治疗方法</h3>
			</div>
			<div>
				<ul v-for="item in list" :key="item.id">
					<li style="border: 1px solid #90B0C5;margin-top: 5px;padding: 5px;">
						<p><span style="color: red;">病名：</span>{{item.title_ming}}</p> 
						<p>病因：{{item.reason}}</p>
						<span>症状：{{item.sysbol}}</span>
						<p>治疗方法：{{item.fangfa}}</p>
					
					</li>
				</ul>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getMsg()
				
		},
		methods:{
			onClickLeft() {
				history.back()
			},
			 async getMsg(){
				 let {data:res}=await this.$http.get('yi_liao/yi_liaoMsg')
				 if(res.status==200){
					 this.list=res.data
					 console.log(this.list)
				 }
			 }
		}
	}
</script>

<style scoped="scoped">
	.head{
		text-align: center;
	}
	.box{
		text-align: center;
	}
</style>
