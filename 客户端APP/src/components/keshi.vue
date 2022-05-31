<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<br>
		<div>
			<ul v-for="item in list" :key="item.id">
				<li style="border: 1px solid #90B0C5;margin-top: 5px;padding: 5px;">
					<p>科室：{{item.keshi}}</p> <!-- <span>标题：{{item.tit}}</span> -->
					<p>介绍：{{item.keshi_desc}}</p>
				
				</li>
			</ul>
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
				let {data:res}=await this.$http.get('/keshi/keshiMsg')
				console.log(res)
				if(res.status==200){
					this.list=res.data
				}
			}
		}
	}
</script>

<style scoped="scoped">
</style>
