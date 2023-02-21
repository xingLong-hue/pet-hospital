// 引入mysql 模块
const mysql = require('mysql')

// 创建连接池对象

const pool = mysql.createPool({
	host: "1.117.77.5",					//主机
	user: "sxl",						//用户名
	password: "123",					//密码
	port: 3306,							//端口号
	database: "petapi",  		//数据库名
	
	// connectionLimit:20,//用于指定数据库连接池中最大的连接数 默认是10个
	// queueLimit:2 //用于指定挂起的最大连接数。如果挂起的连接数量超过这个设定值，就会超出错误。默认是0。

})

// 封装sql 语句

const exec = (sql, parmas, callback) => {
	// 获取数据库连接
	pool.getConnection((err, connection) => {
		// 判断是否连接成功
		if (err) {
			console.log("连接mysql失败!,失败原因："+err)
			// 释放连接
			pool.releaseConnection()
		}
		
		//查询数据库，sql数据库语句，条件parmas参数，
		connection.query(sql, parmas, (err, result, field) => {
			if (err) {
				connection.release(); //释放连接对象
				console.log("执行sql语句查询数据库失败,失败原因："+err);
				return;
			} else {
				// 请求数据库成功，执行下面的操作
				// console.log(field)
				
				callback(result, field) //执行回调函数返回结果l
				
				connection.release(); //释放连接对象
			}

		})

	})
}

module.exports = {
	exec
}
