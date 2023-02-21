// 数据库的操作
const db = require('../db.js')
let zhibanMsg=(req,res)=>{
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量

	let sql="select * from zhibanmsg  limit ?,?"
	let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
	db.exec(sql, parmas, (data) => {
		if (data) {
			let sqlTotal = 'select count(*) as total from zhibanmsg'
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


let update_zhibanMsg=(req,res)=>{
	
	let userid = req.body.id
	let monday = req.body.mondayStatus
	let tuesday = req.body.tuesdayStatus
	let wednesday = req.body.wednesdayStatus
	let thursday= req.body.thursdayStatus
	let friday = req.body.fridayStatus
	let saturday = req.body.saturdayStatus
	let sunday = req.body.sundayStatus
	
	let sql = "update zhibanmsg set mondayStatus=?,tuesdayStatus=?,wednesdayStatus=?,thursdayStatus=?,fridayStatus=?,saturdayStatus=?,sundayStatus=? where id=?"
	
	let parmas = [monday,tuesday,wednesday,thursday,friday,saturday,sunday,userid];
	
	console.log(sql)
	db.exec(sql, parmas, (data) => {
	
			res.json({
				status: 200,
				msg: '更新成功'
			})
	
	
	})
}
let selfzhibanMsg=(req,res)=>{
	let username=req.query.username
	// console.log(req.query)
	let sql = "select * from zhibanmsg where username=?"
	let parmas = [username];
	db.exec(sql, parmas, (data) => {

			res.json({
				status: 200,
				msg: '成功',
				data:data
			})
	
	
	})
}
let insert_zhibanMsg=(req,res)=>{
	let username=req.body.username
	// console.log(req.body)
	let monday = req.body.mondayStatus
	let tuesday = req.body.tuesdayStatus
	let wednesday = req.body.wednesdayStatus
	let thursday= req.body.thursdayStatus
	let friday = req.body.fridayStatus
	let saturday = req.body.saturdayStatus
	let sunday = req.body.sundayStatus
	let sql = "insert into zhibanmsg (username,mondayStatus,tuesdayStatus,wednesdayStatus,thursdayStatus,fridayStatus,saturdayStatus,sundayStatus) values(?,?,?,?,?,?,?,?)"
	let parmas = [username,monday,tuesday,wednesday,thursday,friday,saturday,sunday];
	db.exec(sql, parmas, (data) => {
			res.json({
				status: 200,
				msg: '成功lo',
			})
	
	
	})
}
// 删除app用户信息
let delete_zhibanMsg = (req, res) => {
	let userId = req.body.id
	
	let sql = "delete from zhibanmsg where id=?"
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
	zhibanMsg,
	update_zhibanMsg,
	selfzhibanMsg,
	insert_zhibanMsg,
	delete_zhibanMsg
}