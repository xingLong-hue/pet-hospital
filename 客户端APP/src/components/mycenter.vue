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
				<van-cell is-link title="我的预约" value="" @click="mYyuYue" />
				<van-cell is-link title="我的挂号" value="" @click="mYguahao" />
				<van-cell is-link title="修改密码" value="" @click="Alterpasd" />
				<van-cell is-link title="基本信息" value="" @click="mySelfMsg" />
				<van-cell is-link title="设置个人信息" value=""  @click="shezhi"/>
				<van-cell is-link title="设置宠物信息"  @click="mypet" />
				<van-cell is-link title="退出登录" value="" @click="loginOut" />
				<br>
			</van-cell-group>
		</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				url: '',
				username:''

			}
		},
		created() {
			// this.nickname = window.sessionStorage.getItem("nickname")
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
			mYyuYue() {
				this.$router.push('/myYuYue')
			},
			mYguahao() {
				this.$router.push('/myGuahao')
			},
			Alterpasd() {
				this.$router.push('/alter_pasd')
			},
			shezhi(){
				this.$router.push('/shezhi')
			},
			mySelfMsg(){
				this.$router.push('/mySelfMsg')
			},
			mypet(){
				this.$router.push('/mypet')
			},
			async getMsg(){
				let {data:res}=await this.$http.get('/app_users/mySelfMsg?username='+this.username)
				console.log(res)
				if(res.status==200){
					this.url=res.data[0].headphoto
					this.nickname=res.data[0].nickname
				
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
