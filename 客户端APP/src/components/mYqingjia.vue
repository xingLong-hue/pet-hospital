<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div style="text-align: center;"><h1>我的请假</h1></div>
		<div class="box">
			<div v-for="(item,index) in List">
				<van-cell is-link :title="'请假'+' '+index+' '+'点击查看详情'" @click="show = true" />
				<van-action-sheet v-model:show="show" title="请假详情">
					<van-cell center title="名字" :value="item.name" ></van-cell>
					<van-cell center title="请假理由" :value="item.li_you" />
					<van-cell center title="日期" :value="item.day|dataformat" />
					<van-cell center title="请假时长" :value="item.howlong" />
					<van-cell center title="状态" :value="item.status" />
					
					<van-cell center title="" value="" />
					<van-cell center title="" value="" />
					<van-cell center title="" value="" />
					<van-cell center title="" value="" />
					<van-cell center title="" value="" />
					<van-cell center title="" value="" />
					<van-cell center title="" value="" />
					<van-cell center title="" value="" />
				</van-action-sheet>
			</div>
	
		
		
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				List: [],
				show:false,
			
			}
		},
		created() {
			let username = window.sessionStorage.getItem("username")
			this.getmsg(username)
		},
		methods:{
			onClickLeft() {
				history.back()
			},
			async getmsg(username) {
				// console.log("id",id)
				let {
					data: res
				} = await this.$http.get("/qingjia/self_qingjiaMsg?username=" + username)
				console.log(res)
				if (res.status == 200) {
					this.List = res.data
					console.log(this.List)
			
				}else{
					Toast('未有请假记录。');
				}
			},
			showPopup(){
				this.show=true
			}
		}
		
	}
</script>

<style>
</style>
