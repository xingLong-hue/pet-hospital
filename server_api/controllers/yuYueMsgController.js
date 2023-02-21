const db = require('../db.js')
let yuYueMsg=(req,res)=>{
	
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	const query_data = req.query.query_data
	
		// 列表模块
		let sql = "select * from yuYueMsg limit ?,?"
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
	
		db.exec(sql, parmas, (data) => {
	
			if (data) {
				let sqlTotal = 'select count(*) as total from yuYueMsg'
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
let insertyuYueMsg=(req,res)=>{
	
	console.log(req.body)
	let keshi=req.body.keshi
	let doctor=req.body.doctor
	let day=req.body.day
	let daytime=req.body.time[0]
	let time=req.body.time[1]
	let username=req.body.username
	let petname=req.body.petname
	let phone=req.body.phone
	let sql ="insert into yuYueMsg (petname,petuser,phone,keshi,doctor,yuYueTime,daytime,time_duan) values(?,?,?,?,?,?,?,?)"
	let parmas = [petname,username,phone,keshi,doctor,day,daytime,time];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data=="{}") {
			res.json({
				status: 404,
				msg: '预约失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '预约成功'
			})
		}
	
	
	})
	
	
	
	
}
let SelfyuYueMsg=(req,res)=>{
	console.log(req.query)
	let username=req.query.username
	
	let sql = "select * from yuYueMsg where petuser=? "
	
	let parmas = [username];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data.length==0) {
			res.json({
				status: 404,
				msg: '获取失败'
			})
		} else {
			res.json({
				status: 200,
				data:data,
				msg: '预约信息'
			})
		}
	
	
	})
	
}
let delete_yuYueMsg=(req,res)=>{
	let userId = req.body.id
	// console.log(req)
	let sql = "delete from yuYueMsg where id=?"
	let parmas = [userId]
	db.exec(sql, parmas, (data) => {
		// console.log(data)
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
module.exports = {
	yuYueMsg,
	insertyuYueMsg,
	SelfyuYueMsg,
	delete_yuYueMsg
	
}