const db = require('../db.js')
let keshiMsg=(req,res)=>{
	
	let sql = "select * from keshimsg"
	
	let parmas = [];
	
	db.exec(sql, parmas, (data) => {
	
		console.log(data)
		
		if (data.length==0) {
			res.json({
				status: 500,
				msg: '获取科室信息介绍失败'
			})
		} else {
			res.json({
				status: 200,
				data:data,
				msg: '科室信息介绍'
			})
		}
	
	
	})
	
}
module.exports = {
	keshiMsg
}
