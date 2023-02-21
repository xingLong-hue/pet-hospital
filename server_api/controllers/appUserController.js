// 数据库的操作
const db = require('../db.js')
const qs=require('qs')
// 获取用户列表信息和查询用户信息
let getUserslist = (req, res) => {
	const page_num = req.query.page_num //当前的num
	const page_size = req.query.page_size //当前页的数量
	const query_data = req.query.query_data
	if (query_data) {
		let sql = "select * from app_users where username=?"
		let parmas = [query_data]
		db.exec(sql, parmas, (data) => {
			if (data) {
				let sqlTotal = 'select count(*) as total from app_users where username=?'
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
		// 列表模块   limit 参数 n,m  n表示开始的那条数据，从0开始
		let sql = "select * from app_users limit ?,?"
		// 分页的原理：当前页码-1乘以显示的总数等于n，m等于显示的条数
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]

		db.exec(sql, parmas, (data) => {

			if (data) {
				let sqlTotal = 'select count(*) as total from app_users'
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
// 更新app用户信息
let update_appUsers = (req, res) => {
	// 通过id识别数据库中的位置
	let userid = req.body.newData.id
	let nickname = req.body.newData.nickname
	let pasd = req.body.newData.pasd
	let sex = req.body.newData.sex
	let email = req.body.newData.email
	let address = req.body.newData.address
	let phone = req.body.newData.phone

	let sql = "update app_users set nickname=?,sex=?,password=?,email=?,address=?,phone=? where id=?"

	let parmas = [nickname, sex,pasd, email, address, phone, userid];

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
// 删除app用户信息
let delete_appUsers = (req, res) => {
	let userId = req.body.id
	// console.log(req)

	let sql = "delete from app_users where id=?"
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
let add_app = (req, res) => {
    // 接收前端传过来的数据
	let nick = req.body.add_form_data.nickname
	let username = req.body.add_form_data.username
	let psd = req.body.add_form_data.password
	let sex = req.body.add_form_data.sex
	let email = req.body.add_form_data.email
	let address = req.body.add_form_data.address
	let phone = req.body.add_form_data.phone
	let role = req.body.add_form_data.role
    // 插入数据库语句
	let sql ="insert into app_users (nickname,password,username,sex,email,address,phone,role) values(?,?,?,?,?,?,?,?)"
	let parmas = [nick, psd, username, sex, email, address, phone, role];
	// 执行数据库语句
	db.exec(sql, parmas, (data) => {
		if (data=="{}") {
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


let appuser=(req,res)=>{
	let username=req.query.username
	let password=req.query.password
	let sql ="select * from app_users where username=? and password=?"
	let parmas = [username,password];
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data.length==0) {
			res.json({
				status: 404,
				msg: '失败'
			})
		} else {
			res.json({
				status: 200,
				data:data,
				msg: '成功'
			})
		}
	
	
	})	
}

// 移动端的普通用户注册
let adds=(req,res)=>{
	console.log(req.body)
	let username = req.body.username
	let pasd = req.body.password
	let phone=req.body.phone
	let email=req.body.email
	let sex=req.body.sex
	
	let sql ="insert into app_users (username,password,phone,email,sex) values(?,?,?,?,?)"
	let parmas = [username,pasd,phone,email,sex ];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data=="{}") {
			res.json({
				status: 404,
				msg: '注册失败'
			})
		} else {
			res.json({
				status: 200,
				msg: '注册成功'
			})
		}
	
	
	})
	
}
// 修改用户密码
let update_pasd=(req,res)=>{
	
	console.log(req.body)
	let username = req.body.username
	let psd = req.body.password
	let sql ="update app_users set password=? where username=?"
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
// 设置用户信息
let insert_msg=(req,res)=>{
	// console.log(req.body)
	// console.log(req.body.form[0].value)
	// console.log(req.body.form[1].value)
	// console.log(req.body.form[2].value)
	let username=req.body.username
	let nickname=req.body.form[0].value
	let address=req.body.form[1].value
	let petname=req.body.form[2].value
	let email=req.body.form[3].value
	let phone=req.body.form[4].value
	let sex=req.body.form[5].value
	let role="普通用户"
	
	
	let sql ="update app_users set nickname=?,address=?,role=?,petname=?,email=?,phone=?,sex=? where username=?"
	let parmas = [nickname,address,role,petname,email,phone,sex,username];
	
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

let mySelfMsg=(req,res)=>{
	let username=req.query.username
	console.log(username)
		let sql = "select * from app_users where username=?"
		
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


module.exports = {
	getUserslist,
	update_appUsers,
	delete_appUsers,
	add_app,
	appuser,
	adds,
	update_pasd,
	insert_msg,
	mySelfMsg,
	
}


/*

* 分页查询

* mysql 提供的分页方法: limit m,n ==>m代表从第几号位开始，n: 代表选取的个数

** eg(前10条数据):select * from websites limit 0,10 ==>从第一号位开始，取10条数据 (当前page_num=1) ;m=(1-1)*10

** eg(11-20条数据)：select * from websites limit 10,10 ==>(当前page_num=2) ; m=(2-1)*10

* 由两个例子可见sql分页语句应为：

select * from table limit (page_num-1)*page_size,page_size;

其中page_num是页码，page_szie是每页显示的条数

*/
