<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />

		<div v-for="(item,index) in yuyueList">
			<van-cell is-link :title="'预约'+index+' '+item.keshi+' '+'点击查看详情'" @click="show = true" />
			<van-action-sheet v-model:show="show" title="预约详情" >
				<!-- <div class="content" >{{item.petname}}</div> -->
				<!-- <van-cell center title="宠物名字" :value="item.petname" /> -->
				<van-cell center title="宠物主人" :value="item.petuser" />
				<van-cell center title="电话" :value="item.phone" />
				<van-cell center title="预约的科室" :value="item.keshi" />
				<van-cell center title="预约的日期" :value="item.day|dataformat" />
				<van-cell center title="预约的医生" :value="item.doctor" />
				<van-cell center title="预约的时间" :value="item.daytime" />
				<van-cell center title="预约的详细时间段" :value="item.time_duan" />
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
</template>

<script>
	import Vue from 'vue';
	import {
		Toast
	} from 'vant';
	
	Vue.use(Toast);
	export default {
		data() {
			return {
				yuyueList: [],
				show:false,
				
			}
		},
		created() {
			let username = window.sessionStorage.getItem("username")
			// console.log(id)
			this.getmsg(username)
		},

		methods: {
			onClickLeft() {
				history.back()
			},
			async getmsg(username) {
				// console.log("id",id)
				let {
					data: res
				} = await this.$http.get("/yuYue/SelfyuYueMsg?username=" + username)
				console.log(res)
				if (res.status == 200) {
					this.yuyueList = res.data
					console.log(this.yuyueList)

				}else{
					Toast('未有预约记录。');
				}
			},
		
		}



	}
</script>

<style scoped="scoped">
	.content {
	    padding: 16px 16px 160px;
	}
	.van-cell{
		padding: 10px;
	}
</style>
