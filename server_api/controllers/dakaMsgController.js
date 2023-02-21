const db = require('../db.js')
let dakaMsg=(req,res)=>{
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	const query_data = req.query.query_data
	
		// 列表模块
		let sql = "select * from dakaMsg limit ?,?"
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
	
		db.exec(sql, parmas, (data) => {
	
			if (data) {
				let sqlTotal = 'select count(*) as total from dakaMsg'
				let parmas = []
				db.exec(sqlTotal, parmas, (dataTotal) => {
					if (dataTotal) {
						let total = dataTotal[0].total //查询表中的数量			
						res.json({
							status: 200,
							message: "success",
							data: data,
							paging: {
								page_num: page_num,
								page_size: page_size,
								total: total
							}
						})
					}
				})
	
			} else {
				res.json({
					status: 404,
					data: null,
					msg: '查询失败，资源不存在',
				})
			}
	
		})
	
}

let daka=(req,res)=>{
	let username=req.body.username
	
	console.log(req.body)
	let status="已打卡"
	let sql = 'update dakamsg  set status=? where name=?'
	let parmas = [status,username]
	db.exec(sql, parmas, (data) => {		
			res.json({
				status: 200,
				message: "success",
				data:data
			})
		
	})
	
}

let self_dakaMsg=(req,res)=>{
	let username=req.query.username
	
	console.log(req.query)
	let sql = 'select * from dakamsg where name=?'
	let parmas = [username]
	db.exec(sql, parmas, (data) => {		
			res.json({
				status: 200,
				message: "daka success",
				data:data
			})
		
	})
	
}
let insert_dakaMsg=(req,res)=>{
	let username=req.body.username
	let status=req.body.status
	let time=req.body.time
	console.log(req.body)
	let sql = 'insert into dakamsg (name,status,time) values (?,?,?)'
	let parmas = [username,status,time]
	db.exec(sql, parmas, (data) => {		
			res.json({
				status: 200,
				message: "insert daka success",
				data:data
			})
		
	})
}
let delete_dakaMsg=(req,res)=>{
	
	let Id=req.body.id
	console.log(Id)
	let sql = "delete from dakamsg where id=?"
	let parmas = [Id]
	db.exec(sql, parmas, (data) => {
		console.log(data)
		
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '删除失败'
			})
		} else {
	
			 res.json({
				status: 200,
				msg: '删除成功'
			})
		}
	
	})
	
}
module.exports={
	dakaMsg,
	daka,
	self_dakaMsg,
	insert_dakaMsg,
	delete_dakaMsg
}