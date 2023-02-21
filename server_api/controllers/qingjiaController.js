const db = require('../db.js')
let qingjiaList=(req,res)=>{
	
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	const query_data = req.query.query_data
		// 列表模块
		let sql = "select * from qingjiaMsg limit ?,?"
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
	
		db.exec(sql, parmas, (data) => {
	
			if (data) {
				let sqlTotal = 'select count(*) as total from qingjiaMsg'
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
let updata_qingjiaMsg=(req,res)=>{
	console.log(req.body)
	let stau=req.body.form.status
	let id=req.body.form.id
	let sql = "update qingjiaMsg set status=? where id=?"
	
	let parmas = [stau,id];
	
	db.exec(sql, parmas, (data) => {
	
		if (data.length == 0) {
			res.json({
				status: 404,
				msg: '更新失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '更新成功'
			})
		}
	
	})
}

let tijiao=(req,res)=>{
	console.log(req.body)
	let username=req.body.username
	// let name=req.body.name
	let time=req.body.time
	let howlong=req.body.howlong
	let li_you=req.body.li_you
	let status="申请中"
	let sql = "insert into qingjiaMsg (name,time,howlong,li_you,status) values(?,?,?,?,?)"
	
	let parmas = [username,time,howlong,li_you,status];
	
	db.exec(sql, parmas, (data) => {
	
		if (data.length == 0) {
			res.json({
				status: 404,
				msg: '提交失败'
			})
		} else {
		
			res.json({
				status:200,
				msg:'提交成功'
			})
		}
	
	})	
	
}

let self_qingjiaMsg=(req,res)=>{
	let username=req.query.username
	console.log(req.query)
	let sql = 'select * from qingjiaMsg where name=?'
	let parmas = [username]
	db.exec(sql, parmas, (data) => {		
			res.json({
				status: 200,
				message: "success",
				data:data
			})
		
	})
}

module.exports = {
	qingjiaList,
	updata_qingjiaMsg,
	tijiao,
	self_qingjiaMsg
	
}