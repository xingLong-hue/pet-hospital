// 数据库的操作
const db = require('../db.js')
let doctorUsers = (req, res) => {
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	const query_data = req.query.query_data
	if (query_data) {
		let sql = "select * from doctor_users where username=?"
		let parmas = [query_data]
		db.exec(sql, parmas, (data) => {
			if (data) {
				let sqlTotal = 'select count(*) as total from doctor_users where username=?'
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

		const page_num = req.query.page_num //当前的num
		const page_size = req.query.page_size //当前页的数量
		let sql = "select * from doctor_users limit ?,?"
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
		db.exec(sql, parmas, (data) => {
			if (data) {
				let sqlTotal = 'select count(*) as total from doctor_users'
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
// 添加医生用户
let add_doctorUsers = (req, res) => {
	let nick = req.body.add_form_data.nickname
	let username = req.body.add_form_data.username
	let sex = req.body.add_form_data.sex
	let pasd=req.body.add_form_data.password
	let email = req.body.add_form_data.email
	let address = req.body.add_form_data.address
	let phone = req.body.add_form_data.phone
	let role = req.body.add_form_data.role
	
	let sql1 = "insert into zhibanmsg (username) values(?)"
	let parmas1 = [username];
	
	db.exec(sql1, parmas1, (data) => {
		console.log(data)
	})
	

	let sql = "insert into doctor_users (nickname,username,password,sex,email,address,phone,role) values(?,?,?,?,?,?,?,?)"
	let parmas = [nick, username,pasd,sex, email, address, phone, role];

	db.exec(sql, parmas, (data) => {

		console.log(data)

		if (data == "{}") {
			res.json({
				status: 404,
				msg: '添加用户失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '添加用户成功'
			})
		}


	})
	
	
	
	
}
// 删除医生用户信息
let delete_doctorUsers = (req, res) => {

	let userid = req.body.id
	console.log(userid)
	let sql = "delete from doctor_users where id=?"
	let parmas = [userid]
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
// 更新医生用户的信息
let update_doctorUsers = (req, res) => {
	let userid = req.body.newData.id
	let nickname = req.body.newData.nickname
	let pasd=req.body.newData.pasd
	let sex = req.body.newData.sex
	let email = req.body.newData.email
	let address = req.body.newData.address
	let phone = req.body.newData.phone

	let sql = "update doctor_users set nickname=?,password=?,sex=?,email=?,address=?,phone=? where id=?"

	let parmas = [nickname, pasd,sex, email, address, phone, userid];

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
// 获取医院医生的信息列表
let doctorIntroduceMsg = (req, res) => {
	
	let username=req.query.username
	console.log(username)

	
		let sql = "select * from doctorlistmsg where username=?"
		
		let parmas = [username];
		
		db.exec(sql, parmas, (data) => {
		
				console.log(data)
		
				if (data.length == 0) {
					res.json({
						status: 500,
						msg: '获取医生信息失败'
					})
				} else {
					res.json({
						status: 200,
						data: data,
						msg: '医生信息'
					})
				}
		
		
			})
		

}
// 医院人员管理中，医生信息列表,
let doctormsg=(req,res)=>{
	
		const page_num = req.query.page_num //当前的num
		const page_size = req.query.page_size //当前页的数量
		const query_data = req.query.query_data
		// 查询单个医生信息
		if (query_data) {
			let sql = "select * from doctorlistmsg where username=?"
			let parmas = [query_data]
			db.exec(sql, parmas, (data) => {
				if (data) {
					let sqlTotal = 'select count(*) as total from doctorlistmsg where username=?'
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
		}else{
			
			const page_num = req.query.page_num //当前的num
			const page_size = req.query.page_size //当前页的数量
			let sql = "select * from doctorlistmsg limit ?,?"
			let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
			db.exec(sql, parmas, (data) => {
				if (data) {
					let sqlTotal = 'select count(*) as total from doctorlistmsg'
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
// app医生用户登录，获取数据库信息进行验证
let loginMsg=(req,res)=>{
	let username=req.query.username
	let password=req.query.password
	console.log(username)
	
	let sql = "select * from doctor_users where username=? and password=?"
	
	let parmas = [username,password];
	
	db.exec(sql, parmas, (data) => {
	
			console.log(data)
	
			if (data.length == 0) {
				res.json({
					status: 500,
					msg: '登录失败'
				})
			} else {
				res.json({
					status: 200,
					data: data,
					msg: '登录成功'
				})
			}
	
	
		})
		
}
//app医生用户修改密码 
let update_pasd=(req,res)=>{
	
	console.log(req.body)
	let username = req.body.username
	let psd = req.body.password
	let sql ="update doctor_users set password=? where username=?"
	let parmas = [psd, username];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data.length==0) {
			res.json({
				status: 404,
				msg: '修改密码失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '修改密码成功'
			})
		}
	
	
	})
	
}
// app医生用户注册
let addsdoctor=(req,res)=>{
	console.log(req.body)
	let username = req.body.username
	let pasd = req.body.password
	let phone=req.body.phone
	let email=req.body.email
	let sex=req.body.sex
	let role="医师"
	let sql ="insert into doctor_users (username,password,phone,email,sex,role) values(?,?,?,?,?,?)"
	let parmas = [username,pasd,phone,email,sex,role];
	
	db.exec(sql, parmas, (data) => {
	    
		res.json({
			status: 200,
			msg: '注册成功'
		})
		console.log(data)
		
	// 	if (data=="{}") {
	// 		res.json({
	// 			status: 404,
	// 			msg: '注册失败'
	// 		})
	// 	} else {
	// 		res.json({
	// 			status: 200,
	// 			msg: '注册成功'
	// 		})
	// 	}
	
	
	})
	
}
// app医生用户,设置
let insert_msg=(req,res)=>{
	console.log(req.body)
	let username=req.body.username
	let nickname=req.body.form[0].value
	let age=req.body.form[1].value
	let zhiwei=req.body.form[2].value
	let keshi=req.body.form[3].value
	let address=req.body.form[4].value

	
	
	let sql ="update doctor_users set nickname=?,age=?,zhi_wei=?,ke_shi=?,address=? where username=?"
	let parmas = [nickname,age,zhiwei,keshi,address,username];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data=="{}") {
			res.json({
				status: 404,
				msg: '设置失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '设置成功'
			})
		}
	
	
	})
	
	
}
// 查询APP医生用户的基本信息
let doctor_userMsg = (req, res) => {
	
	let username=req.query.username
	console.log(username)
		let sql = "select * from doctor_users where username=?"
		
		let parmas = [username];
		
		db.exec(sql, parmas, (data) => {
		
				console.log(data)
		
				if (data.length == 0) {
					res.json({
						status: 500,
						msg: '获取基本信息失败'
					})
				} else {
					res.json({
						status: 200,
						data: data,
						msg: '基本信息'
					})
				}
		
		
			})
		

}

// 医院人员管理，添加医生人员

let add_doctotlistMsg=(req,res)=>{

	let username = req.body.add_form_data.username
	let sex = req.body.add_form_data.sex
	let age=req.body.add_form_data.age
	let phone = req.body.add_form_data.phone
	
	let zhiwei = req.body.add_form_data.zhi_wei
	let keshi=req.body.add_form_data.ke_shi
	let shan_chang = req.body.add_form_data.shan_chang
	
	let sql = "insert into doctorlistmsg (username,age,sex,phone,zhi_wei,ke_shi,shan_chang) values(?,?,?,?,?,?,?)"
	let parmas = [username,sex,age,phone,zhiwei,keshi,shan_chang];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
	
		if (data == "{}") {
			res.json({
				status: 404,
				msg: '添加用户失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '添加用户成功'
			})
		}
	
	
	})
}
let delete_doctorlistMsg = (req, res) => {

	let userid = req.body.id
	console.log(userid)
	let sql = "delete from doctorlistmsg where id=?"
	let parmas = [userid]
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
let UpdatedoctorlistMsg=(req,res)=>{
	console.log(req.body)
	let userid = req.body.newData.id
	let username = req.body.newData.username
	let age=req.body.newData.age
	let sex = req.body.newData.sex
	let ke_shi = req.body.newData.keshi
	let phone = req.body.newData.phone
	let zhi_wei = req.body.newData.zhiwei
	let shan_chang = req.body.newData.shan_chang

	let sql = "update doctorlistmsg set username=?,age=?,sex=?,ke_shi=?,phone=?,zhi_wei=?,shan_chang=? where id=?"

	let parmas = [username,age, sex, ke_shi, phone, zhi_wei,shan_chang,userid];

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

module.exports = {
	doctorUsers,
	add_doctorUsers,
	delete_doctorUsers,
	update_doctorUsers,
	doctorIntroduceMsg,
	doctormsg,
	loginMsg,
	update_pasd,
	addsdoctor,
	insert_msg,
	doctor_userMsg,
	add_doctotlistMsg,
	delete_doctorlistMsg,
	UpdatedoctorlistMsg
}
