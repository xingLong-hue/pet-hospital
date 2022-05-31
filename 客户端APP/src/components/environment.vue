<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />

		<div class="box">
			<h1 style="">医院环境设备</h1>
		</div>
		<div class="cont">
			<br>
			<div style="color: #404040;text-align: center;">
				<h3>hospital environment</h3>
				<h4>医院环境</h4>
			</div>
			<div style="padding: 10px;margin-top: -20px;">
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里的医院依照国际动物医院标准和理念全部新的装修，以高端优雅的治疗环境，高效严谨的服务体系和高标准的医疗技术服务于每一位宠物和宠主</p>
				<van-swipe :autoplay="3000" lazy-render>
					<van-swipe-item v-for="image in images" :key="image.id">
						<img :src="image.url" width="100%" height="200px" />
						<span>{{image.text}}</span>
					</van-swipe-item>
				</van-swipe>
			</div>

		</div>
		<br>
		<div class="cont">
			<br>
			<div style="color: #404040;text-align: center;">
				<h3>equipment introduction</h3>
				<h4>设备环境</h4>
			</div>
			<div style="padding: 10px;margin-top: -20px;">
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宠物医院引进国际先进的医疗设备，如RMI核磁共振、CT脑电图断层扫描、德国Moller显微镜、呼吸麻醉机等，还配备多个诊疗室</p>
				<van-swipe :autoplay="3000" lazy-render>
					<van-swipe-item v-for="image in equipment" :key="image">
						<img :src="image" width="100%" height="200px" />
						<span></span>
					</van-swipe-item>
				</van-swipe>
			</div>
		
		</div>
		


		<br>
		<van-grid :gutter="5" :column-num="3">
		   <van-grid-item  >
		      <img src="../assets/7.jpg" width="100px" height="100px"/>
			  <br>
			  <span>手术室环境</span>
		   </van-grid-item>
		   <van-grid-item  >
		      <img src="../assets/4.jpg" width="100px" height="100px"/>
		   			  <br>
		   			  <span>显微镜</span>
		   </van-grid-item>
		   <van-grid-item  >
		      <img src="../assets/9.jpg" width="100px" height="100px"/>
		   			  <br>
		   			  <span>B超</span>
		   </van-grid-item>
		</van-grid>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				images: [
					{	
						id:1,
						url:'http://www.ananpet.com/Public/Uploads/Environment/2018-07-20/5b5194dc263bf.jpg',
						text:'安静整洁的诊疗室'
					
					},
					{
						id:2,
						url:'http://www.ananpet.com/Public/Uploads/Environment/2018-07-20/5b518b75bbb52.jpg',
						text:'舒适的诊疗环境'
					
					},
					{
						id:3,
						url:'http://www.ananpet.com/Public/Uploads/Environment/2018-07-20/5b518b3b6aeeb.jpg',
						text:'先进的设备'
					
					}
					
				],
				equipment:[
					'http://www.ananpet.com/Public/Uploads/Equipment/2018-07-18/5b4f02cdf2344.jpg',
					'http://www.ananpet.com/Public/Uploads/Equipment/2018-07-18/5b4f02892fab2.jpg',
					'http://www.ananpet.com/Public/Uploads/Equipment/2018-07-18/5b4f024a558d2.jpg',
					'http://www.ananpet.com/Public/Uploads/Equipment/2018-07-18/5b4f01999b7e1.jpg',
					'http://www.ananpet.com/Public/Uploads/Equipment/2018-07-18/5b4f01669fac0.jpg',
					'http://www.ananpet.com/Public/Uploads/Equipment/2018-07-18/5b4f006370b8e.jpg',
					'http://www.ananpet.com/Public/Uploads/Equipment/2018-07-18/5b4effc3aca31.jpg'
				],

				list: [{
						id: 1,
						photo: '../assets/1.jpg',
						text: '挂钩法怒放'
					},
					{
						id: 2,
						photo: 'photo-o',
						text: '螯合钙就覅发'
					},
					{
						id: 3,
						photo: 'photo-o',
						text: '爱发飙安监部覅阿奶'
					},
				]
			}
		},
		methods: {
			onClickLeft() {
				history.back()
			},
		}
	}
</script>

<style scoped="scoped">
	.box {
		height: 200px;
		width: 100%;
		background: url(../assets/2.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		margin: auto;
		color: #FFFFFF;
	}

	.cont {
		background-color: #ECEEEB;
		height:450px;
		margin-top: -30px;
		border-radius: 20px 20px 0px 0px;
	}

	.my-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		background-color: #39a9ed;
	}
</style>
