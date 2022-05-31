<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<!-- <br> -->
		<!-- 医生介绍 -->
		<van-tree-select height="550px" :items="items" :active-id.sync="activeId" :main-active-index.sync="activeIndex"
			@click-nav="clicknav" @click-item="clickitem" />
	</div>
</template>

<script>
	export default{
		data(){
			return{
				items: [],
				activeId: '',
				activeIndex: 0,
			}
		},
		created(){
			this.getMsg()
		},
		methods:{
			onClickLeft() {
				history.back()
			},
			clickitem(data) {
			
				let index = this.activeIndex
				let active_text = this.items[index].text
				let active_item = data.text
			
				console.log(active_text, active_item)
				window.sessionStorage.setItem('keshi', active_text)
				window.sessionStorage.setItem('doctor', active_item)
				this.$router.push('/doctorDeail')
			},
			clicknav(index) {
				this.activeIndex = index

			},
			async getMsg(){
				let {data:res}=await this.$http.get('keshi_doctorMsg/keshi_doctorMsg')
				console.log(res)
				if(res.status==200){
					this.items=res.data
				}
			}
		}
	}
</script>

<style>
</style>
