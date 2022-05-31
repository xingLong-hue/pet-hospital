<template>
	<div id="box">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div style="text-align: center;">
			<van-image round width="7rem" height="7rem" :src="url" />
			<br>
			<span>{{nickname}}</span>

		</div>
		<br>
		<hr>
		<div >
			<van-cell-group inset >
				<!-- <van-cell is-link title="我的预约" value="" @click="mYyuYue" /> -->
			
				<van-cell is-link title="我的请假" value="" @click="mYqingjia" />
				<van-cell is-link title="我的打卡" value="" @click="mYdaka" />
				<van-cell is-link title="我的排班" value="" @click="myZhiban" />
				<van-cell is-link title="修改密码" value="" @click="Alterpasd1" />
				 <!-- <hr>	 -->
				<van-cell is-link title="基本信息" value="" @click="myMsg" /> 
				
				<!-- <van-cell is-link title="结果报告" value="" />
				<van-cell is-link title="收货地址" value="" /> -->
				<!-- <hr> -->
				<van-cell is-link title="设置" value=""  @click="shezhi1"/>
				<van-cell is-link title="退出登录" value="" @click="loginOut" />
				

				<br>
				<!-- <van-button round type="primary" block >退出登录</van-button> -->
			</van-cell-group>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				url: ''

			}
		},
		created() {
			this.nickname = window.sessionStorage.getItem("nickname")
			this.username = window.sessionStorage.getItem("username")
			// this.url = window.sessionStorage.getItem("headphoto")
			this.getMsg()
		},
		methods: {
			onClickLeft() {
				history.back()
			},
			loginOut() {
				this.$router.push('/')
			},
			mYqingjia() {
				this.$router.push('/mYqingjia')
			},
			mYdaka() {
				this.$router.push('/mYdaka')
			},
			Alterpasd1() {
				this.$router.push('/alter_pasd1')
			},
			shezhi1(){
				this.$router.push('/shezhi1')
			},
			myMsg(){
				this.$router.push('/myMsg')
			},
			myZhiban(){
				this.$router.push('/myZhiban')
			},
			async getMsg(){
				let {data:res}=await this.$http.get('/doctor/doctor_userMsg?username='+this.username)
				console.log(res)
				if(res.status==200){
					this.url=res.data[0].headphoto
				}
				
			},

		}
	};
</script>

<style scoped="scoped">
	/* .box{
		height: 650px;
		text-align: center;
		padding: 20px;
		border: 1px solid red;
	} */
	/* .van-cell{
		background-color: #75E1E3;
	} */
</style>
