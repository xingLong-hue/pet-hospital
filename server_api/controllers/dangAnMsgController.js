// 数据库的操作
const db = require('../db.js')
const qs=require('qs')
// 获取档案信息列表信息和查询宠物信息
let dangAnMsg = (req, res) => {
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	const query_data = req.query.query_data
	if (query_data) {
		let sql = "select * from dangAnMsg where petname=?"
		let parmas = [query_data]
		db.exec(sql, parmas, (data) => {
			if (data) {
				let sqlTotal = 'select count(*) as total from dangAnMsg where petname=?'
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
		let sql = "select * from dangAnMsg limit ?,?"
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]

		db.exec(sql, parmas, (data) => {

			if (data) {
				let sqlTotal = 'select count(*) as total from dangAnMsg'
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
let daleteDangAnMsg=(req,res)=>{
	let Id=req.body.id
	// console.log(Id)
	let sql = "delete from dangAnMsg where id=?"
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

// 获取宠物信息
let getPetMsg=(req,res)=>{
	
	let username=req.query.petusername
	console.log(req)
	let sql = "select * from dangAnMsg where petusername=?"
	let parmas = [username]
	db.exec(sql, parmas, (data) => {
		res.json({
			status: 200,
			data: data,
			msg: '基本信息'
		})
	})
	
	
}
// 添加宠物信息
let postPetMsg=(req,res)=>{
	console.log(req.body)
	// let username=req.body
	let petname=req.body.form[0].value
	let petusername=req.body.form[1].value
	let phone=req.body.form[2].value
	// let photoUrl=req.body.form[3].value
	let history=req.body.form[3].value

	let sql = "update dangAnMsg set petname=?,phone=?,history=? where petusername=?"
	let parmas = [petname,phone,history,petusername]
	db.exec(sql, parmas, (data) => {
		
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '失败'
			})
		} else {
			 res.json({
				status: 200,
				msg: '成功'
			})
		}
	
	})
	
}
let updatePet=(req,res)=>{
	// console.log(req.body)
	let petusername=req.body.petusername
	let petname=req.body.petname
	let history=req.body.history
	let phone=req.body.phone
	let photo=req.body.photoUrl
	
	let sql = "update dangAnMsg set petname=?,phone=?,history=? where petusername=?"
	let parmas = [petname,phone,history,petusername]
	db.exec(sql, parmas, (data) => {
		
		if (data.length == 0) {
			 res.json({
				status: 404,
				msg: '失败'
			})
		} else {
			 res.json({
				status: 200,
				msg: '成功'
			})
		}
	
	})
	
}
module.exports = {
	dangAnMsg,
	daleteDangAnMsg,
	getPetMsg,
	postPetMsg,
	updatePet
}
