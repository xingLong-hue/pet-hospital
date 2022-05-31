<template>
	
	<div>
		<router-view></router-view>
		<van-tabbar v-model="active" @change="btn_bar">
			<van-tabbar-item name="index1" icon="home-o" >首页</van-tabbar-item>
			<van-tabbar-item name="introduce1" icon="shield-o" >医院简介</van-tabbar-item>
			<van-tabbar-item name="mycenter1" icon="friends-o" >我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				active: 'index1'
			}
		},
		created(){
			this.$router.push("/index1")
		},
		methods:{
			btn_bar() {
				this.$router.push("/" + this.active)
				
			},
			
		}
	}
</script>

<style>
</style>
