const db = require('../db.js')
let yi_liaoMsg=(req,res)=>{
	
	let sql = "select * from usuall_fill"
	
	let parmas = [];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data.length==0) {
			res.json({
				status: 500,
				msg: '获取常见的医疗方法信息失败'
			})
		} else {
			res.json({
				status: 200,
				data:data,
				msg: '成功获取常见的医疗方法信息'
			})
		}
	
	})
	
}

let yi_liaoMsg2=(req,res)=>{
	
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	const query_data = req.query.query_data
	if (query_data) {
		let sql = "select * from usuall_fill where username=?"
		let parmas = [query_data]
		db.exec(sql, parmas, (data) => {
			if (data) {
				let sqlTotal = 'select count(*) as total from usuall_fill where username=?'
				let parmas = [query_data]
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
	} else {
		// 列表模块
		let sql = "select * from usuall_fill limit ?,?"
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
	
		db.exec(sql, parmas, (data) => {
	
			if (data) {
				let sqlTotal = 'select count(*) as total from usuall_fill'
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
	
}

// 更新信息
let update_yiliaoMsg = (req, res) => {
	let id= req.body.newData.id
	let title= req.body.newData.title
	let reason= req.body.newData.reason
	let fangfa= req.body.newData.fangfa
	let sysbol= req.body.newData.sysbol
	console.log(req.body)
	console.log(title)
	let sql = "update usuall_fill set title_ming=?,reason=?,fangfa=?,sysbol=? where id=?"

	let parmas = [title,reason,fangfa,sysbol,id];

	// console.log(sql)
	db.exec(sql, parmas, (data) => {

		if (data.length == 0) {
			res.json({
				status: 404,
				msg: '更新失败'
			})
		} else {
			// console.log(data.affectedRows)
			res.json({
				status: 200,
				msg: '更新成功'
			})
		}

	})


}
// 删除信息
let delete_yiliaoMsg = (req, res) => {
	let userId = req.body.id
	// console.log(req)

	let sql = "delete from usuall_fill where id=?"
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

let add_yiliaoMsg=(req,res)=>{
	
	let title_ming = req.body.title_ming
	let reason = req.body.reason
	let sysbol = req.body.sysbol
	let fangfa = req.body.fangfa

	let sql = "insert into usuall_fill (title_ming,reason,sysbol,fangfa) values(?,?,?,?)"
	let parmas = [title_ming, reason, sysbol, fangfa, ];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
	
		if (data == "{}") {
			res.json({
				status: 404,
				msg: '添加失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '添加成功'
			})
		}
	
	
	})
}


module.exports = {
	yi_liaoMsg,
	yi_liaoMsg2,
	delete_yiliaoMsg,
	update_yiliaoMsg,
	add_yiliaoMsg
}
