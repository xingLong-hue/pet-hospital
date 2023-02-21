// 接收图片上传

const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const path=require('path')
const fs = require('fs')
// 导入muilter插件
const multer=require('multer')

// 使用multer生成一个仓库信息
const stroage_cang=multer.diskStorage({
	// 设定存储路径
	destination:function(req,file,cb){
	
		cb(null,path.join(__dirname,'../public/img'))
	},
	// 设置文件名称
	filename:function(req,file,cb){
	
		const tem=path.extname(file.originalname)
		// 设置图片文件的命名
		cb(null,`pet_${new Date().getTime()}-${Math.random().toString().slice(2)}${tem}`)
	}
})
// 设置接收器，带有仓库信息
const fileUpload=multer({storage:stroage_cang})

router.post('/photo',fileUpload.single('doctot_headphoto'),(req,res)=>{
	
	console.log(req.query)
	let username=req.body.username
	console.log(username)

	let {size,mimetype,path}=req.file;
	// console.log(mimetype)
	let types=['jpeg','jpg','png','gif'];//允许上传的类型
	let tmpType=mimetype.split('/')[1];

	// console.log(tmpType)
	if(size>5000000){
		return res.send({err:-1,msg:'上传的内容不能超过5000000'})
	}else if(types.indexOf(tmpType)==-1){
		return res.send({err:-2,msg:'上传的类型错误'})
	}else{

		let url=`${req.file.filename}`;
		http = 'http://127.0.0.1:3000/'+url
		console.log(http)
		let sql = "update doctor_users set headphoto=? where username=?"
		let parmas = [http,username];
		console.log(sql)
		db.exec(sql, parmas, (data) => {
			res.json({
				status: 200,
				msg: '头像上传更新成功'
			})
		})
	
	}
})


// 导出表
module.exports=router
