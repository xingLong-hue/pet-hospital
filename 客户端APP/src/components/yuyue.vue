<template>
	
	<div>
		<br>
		<van-nav-bar  left-text="科室列表" left-arrow @click-left="onClickLeft" />
		<van-search v-model="value" placeholder="请输入搜索科室,医生" />
		<van-tree-select height="550px"  :items="items" :active-id.sync="activeId" :main-active-index.sync="activeIndex" @click-nav="clicknav"  @click-item="clickitem" />
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
		  value:'',
		  items:[],
	      activeId: '',
	      activeIndex: 0,
		  form:{}
	    };
	  },
		created(){
			this.getmsg()
		},
	  methods:{
		  onClickLeft(){
		  	history.back()
		  },
		  clickitem(data){
			
			  
			  let index=this.activeIndex
			  let active_text=this.items[index].text
			  let active_item=data.text
			  // console.log(data)
			 
			  // console.log(active_text,active_item)
			  window.sessionStorage.setItem('keshi',active_text)
			  window.sessionStorage.setItem('doctor',active_item)
			  
			  this.$router.push('/sure_yuyue')
			  
			  
		  },
		  clicknav(index){
			    this.activeIndex=index
				
				// console.log("点击到的",index)
				
				// console.log(this.items[index].text)
		  },
			async getmsg(){
				let {data:res}=await this.$http.get('keshi_doctorMsg/keshi_doctorMsg')
				// console.log(res)
				this.items=res.data
				
			}
		  
		  
	  }
	  
	  
	  
	  
	};
</script>

<style>
</style>
