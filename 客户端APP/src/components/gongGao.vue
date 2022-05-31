<template>
	<div>
		<br>
		<van-nav-bar left-text="首页" left-arrow @click-left="onClickLeft" />
		<div class="content">
			<div style="text-align: center;">
				<h3>医院公告信息</h3>
			</div>
			<div>
				<ul v-for="item in datalist" :key="item.id">
					<li style="border: 1px solid #90B0C5;margin-top: 5px;padding: 5px;">
						<p>日期：{{item.time|dataformat}}</p> <span>标题：{{item.tit}}</span>
						<p>内容：{{item.miaoshu}}</p>
					
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				datalist: [],
				

			}
		},
		created() {
			this.getGongGaoMsg()

		},
		methods: {
			onClickLeft() {
				history.back()
			},
			async getGongGaoMsg(){
				let {data:res}=await this.$http.get('/hospital/hospitalMsg2')
				// console.log(res.dataMsg)
				 this.datalist=res.dataMsg
				 this.time=res.dataMsg[0].time
					
			},
		}
	}
</script>

<style scoped="scoped">
	.content {
		margin: 15px;
	}
</style>
