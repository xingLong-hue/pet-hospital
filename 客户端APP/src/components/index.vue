<template>
	<div>
		<div class="header">
			<van-image width="100%" height="200px" :src="url" />
		</div>
		<div class="baiban">
			<br>
			<div class="body_box">

				<van-grid :gutter="10" :column-num="3" >
					<van-grid-item v-for="value in list" name="" @click="btn(value.path)" :key="value.id" :icon="value.photo" :text="value.text" />
				</van-grid>

			</div>
			
			<!-- <van-notice-bar
			  left-icon="volume-o"
			  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
			/> -->
			<div class="content">
				<van-grid :gutter="10" :column-num="3">
					<van-grid-item v-for="value in list2" @click="btn(value.path)" :key="value.id" :icon="value.photo" :text="value.text" />
				</van-grid>
			</div>
			<hr>
		
			<div>
				<div><img src="../assets/1.png" width="100%" height="200px" alt=""></div>
			</div>	
			<!-- <div class="content">
				<van-grid :gutter="10" :column-num="3">
					<van-grid-item v-for="value in list3" :key="value.id" :icon="value.photo" :text="value.text" />
				</van-grid>
			</div> -->


		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// url: '../assets/2.png',
				url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.shejiben.com%2Fcase%2F2017%2F10%2F23%2F20171023131100-b3b0255e-2s.jpg&refer=http%3A%2F%2Fpic1.shejiben.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650342365&t=cb5bb21e412ed9137d6d6025dbe76e73',
				list: [
					{   id:'1',
						text: '预约',
						photo: 'comment-o',
						path:'/yuyue'
					},
					{
						 id:'2',
						text: '挂号',
						photo: 'comment-o',
						path:'/guahao'
					},
					{
						id:'3',
						text: '常见疾病治疗',
						photo: 'comment-o',
						path:'/yi_liao'
					},

				],
				list2:[
					{	id:'4',
						text: '医院公告',
						photo: 'comment-o',
						path:'/gongGao'
					},
					{	
						id:'5',
						text: '环境设备',
						photo: 'comment-o',
						path:'/environment'
					},
					{	
						id:'6',
						text: '医生介绍',
						photo: 'comment-o',
						path:'/doctorIntroduce'
					},
				],
				// list3:[
				// 	{
				// 		text: '在线请假',
				// 		photo: 'comment-o'
				// 	},
				// 	{
				// 		text: '在线打卡',
				// 		photo: 'comment-o'
				// 	},
				// 	{
				// 		text: '环境设备',
				// 		photo: 'comment-o'
				// 	},
				// ]
			}
		},
		methods:{
			btn(path){
				console.log(path)
				this.$router.push(path)
			}
		}
	}
</script>

<style scoped="scoped">

	.baiban {
		background-color: #F7F7F7;
		height: 460px;
		border-radius: 25px 25px 0px 0px;
		position: relative;
		top: -75px;
	}

	.body_box {
		/* border: 1px solid red; */
		margin: 10px;
		padding: 5px;
		/* height: 120px; */
	}

	.content {
		margin: 10px;
	}
</style>
