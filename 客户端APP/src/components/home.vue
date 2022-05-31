<template>
	
	<div>
		<router-view></router-view>
		<van-tabbar v-model="active" @change="btn_bar">
			<van-tabbar-item name="index" icon="home-o" >首页</van-tabbar-item>
			<van-tabbar-item name="introduce" icon="shield-o" >医院简介</van-tabbar-item>
			<van-tabbar-item name="mycenter" icon="friends-o" >我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				active: 'index'
			}
		},
		created(){
			this.$router.push("/index")
		},
		methods:{
			btn_bar() {
				this.$router.push("/" + this.active)
				
				
				// console.log(this.active)
			},
			
		}
	}
</script>

<style>
</style>
