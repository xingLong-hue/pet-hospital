<template>
	<div>
		<div class="header">
			<van-image  width="100%" height="200px" :src="url" />
		</div>
		<div class="baiban">
			<br>
			<div class="body_box">
				<div style="height: 60px;padding: 5px;" >
					<div style="float: left;">
						<van-image  width="50px" height="50px" :src="url" />
					</div>
					<div style="float: left;margin-left: 20px;">
						<h3>{{name}}</h3> 
					</div>
				</div>
				<van-icon name="phone-o" /> <span>{{tel}}</span>
				<br>
				<van-icon name="location-o" /><span>{{address}}</span>
			</div>
			<hr>
			<h4>功能清单</h4>
			<div class="content">
				<van-grid :gutter="10" :column-num="2">
					<van-grid-item v-for="value in list2" @click="btn(value.path)" :key="value.id" :icon="value.photo" :text="value.text" />
				</van-grid>
			</div>
			<hr>
			<div class="content">
				<h4>本院介绍</h4>
			    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{desc}}</p>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.shejiben.com%2Fcase%2F2017%2F10%2F23%2F20171023131100-b3b0255e-2s.jpg&refer=http%3A%2F%2Fpic1.shejiben.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650342365&t=cb5bb21e412ed9137d6d6025dbe76e73',
				// url:'../assets/12.jpg'
				name:'',
				tel:'',
				address:'',
				desc:'',
				list2:[
					
					{	
						id:'5',
						text: '科室介绍',
						photo: 'comment-o',
						path:'/keshi'
					},
					{	
						id:'6',
						text: '医生介绍',
						photo: 'comment-o',
						path:'/doctorIntroduce'
					},
				],
			}
		},
		created(){
			this.getMsg()
		},
		methods:{
			async getMsg(){
				  let {data:res} = await this.$http.get("hospital/hospitalMsg")
				  console.log(res.data)
				  
				  this.name=res.data[0].name
				  this.tel=res.data[0].tel
				  this.address=res.data[0].address
				  this.desc=res.data[0].introduce
			 },
			 btn(path){
			 	console.log(path)
			 	this.$router.push(path)
			 }
		}
	}
</script>

<style scoped="scoped">
	.header{
		/* position: absolute; */
	}
	.baiban{
		background-color:#F7F7F7;
		height: 460px;
		border-radius:25px 25px 0px 0px ;
		position: relative;
		top: -50px;
	}
	.body_box{
		/* border: 1px solid red; */
		margin: 10px;
		height: 120px;
	}
	.content{
		margin: 10px;
	}
	p{
		height: 300px;
	}
</style>
