const db = require('../db.js')
let keshi_doctorMsg = (req, res) => {
	// 通过外键把科室和医生表联系起来
	let sql="select doctorlistmsg.username,keshimsg.keshi from doctorlistmsg,keshimsg where doctorlistmsg.keshi_id=keshimsg.id"
	let parmas = []
	db.exec(sql, parmas, (data) => {
		// 通过科室查询医生表，把所有同科室的医生选出来
		// let arry=[]
		const resObject = {}
		// 把查询的结果放到一个对象
		 data.forEach((item) => {
		      if (!resObject[item.keshi]) {
		        resObject[item.keshi] = [item.username];
		      } else {
		        resObject[item.keshi].push(item.username);
		      }

		});
	   // 返回前端界面的数组
	   const resd = [];
	   // 遍历上面的对象值，一一放到childre数组里，使得结果为树形结构
	   // 也就是每个科室里有多少医生
		Object.keys(resObject).forEach((item, index) => {
			  const children = [];
			  resObject[item].forEach((item, index) => {
				  console.log(resObject)
				children.push({
				  id: index,
				  text: item,
				})
			  })
			  resd.push({
				text: item, //科室名称
				children,    //医生的集合
			  })
		})
		// 把最后的结果数据返回给前端
		res.json({
			msg: "success",
			status:200,
			data: resd
		})
	})





}

module.exports = {
	keshi_doctorMsg
}
