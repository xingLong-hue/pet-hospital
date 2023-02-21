const db = require('../db.js')

let hospital_introduce=(req,res)=>{
	// let name=req.body.name
	// console.log(userid)
	let sql = "select * from hospitalintroduce"
	let parmas = []
	db.exec(sql, parmas, (data) => {
		// console.log(data)
		
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '获取失败'
			})
		} else {
	
			 res.json({
				status: 200,
				msg: '获取成功',
				data:data
			})
		}
	
	})
	
}
let update_introduce=(req,res)=>{
	
	let formData=req.body
	console.log(formData)
	let intro=formData.desc_title
	let name=formData.name
	// console.log("拿到的",intro)
	// console.log(name)
	let sql = "update hospitalintroduce set introduce=? where name=?"
	let parmas = [intro,name]
	db.exec(sql, parmas, (data) => {
		// console.log(data)
			 res.json({
				status: 200,
				msg: '修改成功',
				data:data	
			})
		
	
	})
	
}



let hospitalMsg=(req,res)=>{
	let sql = "select * from gongGaoMsg"
	let parmas = []
	db.exec(sql, parmas, (data) => {
		// console.log(data)
		
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '获取失败'
			})
		} else {
	
			 res.json({
				status: 200,
				msg: '获取成功',
				dataMsg:data
			})
		}
	
	})
	
}

let delete_hospitalMsg=(req,res)=>{
	let id=req.body.id
	// console.log(req)
	console.log(id)
	let sql = "delete from gongGaoMsg where id=?"
	let parmas = [id]
	db.exec(sql, parmas, (data) => {
		// console.log(data)
		
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '获取失败'
			})
		} else {
	
			 res.json({
				status: 200,
				msg: '获取成功',
				dataMsg:data
			})
		}
	
	})
	
}


let update_hospitalMsg=(req,res)=>{
	// 修改公告信息
	let id=req.body.id
	let descc=req.body.ds
	let sql = "update gongGaoMsg set miaoshu=? where id=?"
	let parmas = [descc,id]
	db.exec(sql, parmas, (data) => {
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '获取失败'
			})
		} else {
	        // 返回成功提示信息
			 res.json({
				status: 200,
				msg: '获取成功',
				dataMsg:data
			})
		}
	
	})
	
}
let add_hospitalMsg=(req,res)=>{
	
	let dataform=req.body
	let tit=req.body.tit
	let time=req.body.time
	let miaoshu=req.body.add_miaoshu
	let sql = "insert into gongGaoMsg (tit,time,miaoshu) values (?,?,?)"
	let parmas = [tit,time,miaoshu]
	db.exec(sql, parmas, (data) => {
		// console.log(data)
		
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '获取失败'
			})
		} else {
	
			 res.json({
				status: 200,
				msg: '获取成功',
				dataMsg:data
			})
		}
	
	})
	
}

module.exports={
	hospital_introduce,
	update_introduce,
	hospitalMsg,
	delete_hospitalMsg,
	update_hospitalMsg,
	add_hospitalMsg
}