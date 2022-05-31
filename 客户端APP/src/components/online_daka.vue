<template>
	<div>
		<br>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		
		
		<div class="box">
			<h1>在线打卡</h1>
			<br>
			<van-button class="button" type="default" :color="color" @click="btn">{{status}}</van-button>
		
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Toast
	} from 'vant';
	
	Vue.use(Toast);
	export default{
		data(){
			return{
				color:'#B3BBBE',
				name:'',
				status:'未打卡'
				
			}
		},
		created(){
			this.name=window.sessionStorage.getItem("username")
			this.getdakamsg()
			this.time()
			
		},
		methods:{
			onClickLeft() {
				history.back()
			},
			async getdakamsg(){
				
				let {data:res} = await this.$http.get("/daka/self_dakaMsg?username="+this.name)
				console.log(res.data)
				if(res.status==200){
					let today=this.time()
					let arr=res.data
					
					this.formatTime(arr)
					let len=res.data.length
					for(let i=0;i<len;i++){
						if(arr[i].time!==today){
							// console.log(arr[i].time)
							this.status="未打卡"
						}
						else{
							
							this.status="已打卡"
							this.color="green"
						
						}
					}
										
					if(res.data[0].status=="已打卡"){
						this.status="已打卡"
						this.color="green"
				    }
					
					
				}
				
			},
			async btn(){
	
				let username=this.name
				let time=new Date()
	
				let year=time.getFullYear()
				let month=time.getMonth()+1
				let day=time.getDate()
				let str=year+'-'+month+'-'+day
	
				let dataTime={
					time:str,
					username:username,
					status:"未打卡"
				}
				
				let fm=this.$qs.stringify(dataTime)
				console.log(fm)
				
				let {data:res1} = await this.$http.post("/daka/insert_dakaMsg",fm)
				if(res1.status==200){
					
					Toast('打卡成功3333');
				}else{
					Toast('打卡失败33333');
				}
			
				let {data:res} = await this.$http.put("/daka/daka",fm)
				if(res.status==200){
					this.status="已打卡"
					this.color="green"
					Toast('打卡成功');
				}else{
					Toast('打卡失败');
				}

			},
			// 获取今天的日期
			time(){
				
				let day=new Date()
				let year=day.getFullYear()
				let month=day.getMonth()+1
				let time1=day.getDate()
				console.log(year)
				console.log(month)
				console.log(time1)
				
				let daytime = year + "-" + month +'-' + time1
				console.log(daytime)
				
				return daytime
				
			},
			formatTime(arr){
				for(let i=0;i<arr.length;i++){
					console.log(arr[i].time)
					arr[i].time=arr[i].time.slice(0,10)
					// console.log(arr[i].time)
				}
				
			}
			
			
		}
		
	}
</script>

<style scoped="scoped">
	.box{
		text-align: center;
	}
	.button{
		width: 120px;
		height: 120px;
		border: 1px solid gainsboro;
		border-radius: 50%;
		outline:none
	}
</style>
