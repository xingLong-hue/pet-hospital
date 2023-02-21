const db = require('../db.js')
let alterPassword = (req, res) => {
	let password = req.body.password
	let password2 = req.body.password2
	let username = req.body.username
	let sql = "update manage_users set password=? where username=? and password=?"
	let parmas = [password2,username,password]
	db.exec(sql, parmas, (data) => {
	
		
			if (data.length == 0) {
				res.json({
					status: 404,
					msg: '修改失败'
				})
			} else {
			
				res.json({
					status: 200,
					msg: '修改成功',
				})
			}	
	})

}
module.exports = {
	alterPassword
}
