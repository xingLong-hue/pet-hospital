// 数据库的操作
const db = require('../db.js')
const token=require('../module/token.js')
// 登录,获取用户信息
let getUsers = (req, res) => {
	
	// console.log(req.query.username)
	// console.log(req.query.password)
	let user = req.query.username;
	let psd = req.query.password;
	
	let sql = "select * from manage_users where username=? and password=?";
	let parmas = [user,psd];
	db.exec(sql, parmas, (data) => {
		// res.send(result)
		console.log(data)
		
		if (data.length==0) {
			res.json({
				status: 404,
				msg: '账号或密码错误',
			})
		}else{
			
			let id="JHGDFGY"//数据库返回的id
			let tokenkey=Token.en(id)
			res.json({
				status: 200,
				msg: '登录成功',
				data:data,
				tokenkey
			})
		}

	})

}
// 添加用户
let addUsers = (req, res) => {
	let user = req.body.username
	let psd = req.body.password
	let role=req.body.role
	console.log(user)
	console.log(psd)
	
	let sql = "insert into manage_users (username,password,role) values (?,?,?)";
	let parmas = [user, psd,role];
	db.exec(sql, parmas, (data) => {
		
		console.log("jknknknfgfgf")
		res.json({
			status:200,
			data: data,
			msg: '添加成功'
		})
	})

}

// 删除用户
let DelUsers = (req, res) => {
	let userid = req.body.id

	// let username=req.body.username
	// let password=req.body.password
	let sql = "delete from manage_users where id=?";
	let parmas = [userid];
	db.exec(sql, parmas, (data) => {
		res.json({
			data: data,
			msg: '删除成功'
		})
	})

}
// 更新用户
let UpdateUsers = (req, res) => {
	let userid = req.body.id
	let username = req.body.username
	let password = req.body.passwor
	let sql = `update manage_users set username=? where id=?;`
	console.log(typeof(userid))
	console.log(username)
	console.log(sql)
	let parmas = [username, userid];
	db.exec(sql, parmas, (data) => {
		res.json({
			data: data,
			msg: '更新成功'
		})
	})

}
// 列表用户
let Lists = (req, res) => {
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	let sql = "select * from manage_users limit ?,?"
	let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
	db.exec(sql, parmas, (data) => {
		if (data) {
			let sqlTotal = 'select count(*) as total from manage_users'
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
let delete_manage_users=(req,res)=>{
	let userid=req.body.id
	console.log(userid)
	let sql = "delete from manage_users where id=?"
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

module.exports = {
	getUsers,
	addUsers,
	DelUsers,
	UpdateUsers,
	Lists,
	delete_manage_users
}
