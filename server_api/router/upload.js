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
		// req  本次请求
		// file  本次请求的文件
		//cb   回调函数，利用回调函数来设定存储的路径
		// 回调函数的第一个参数为null，表示不要修改我的二进制流 文件
		cb(null,path.join(__dirname,'../public/img'))
	},
	// 设置文件名称
	filename:function(req,file,cb){
		// req  本次请求
		// file  本次上传的文件信息
		// 通过回调来设定文件的名称
		// console.log(file)
		// 获取文件的后缀
		const tem=path.extname(file.originalname)
		// 设置图片文件的命名
		cb(null,`avar_${new Date().getTime()}-${Math.random().toString().slice(2)}${tem}`)
	}
})
// 设置接收器，带有仓库信息
const fileUpload=multer({storage:stroage_cang})

router.post('/photo',fileUpload.single('img'),(req,res)=>{
	
	   //img 要上传图片数据的key值 必须和前端保持统一   {   'img':图片数据}
	    // console.log(req.file);
	    // { fieldname: 'hehe',//接受数据库的key值
	    //     originalname: '2019-12-06_102017.jpg',//原始名字
	    //     encoding: '7bit', //转码
	    //     mimetype: 'image/jpeg', //文件类型
	    //     destination: './uploads', //存储位置
	    //     filename: 'aaa.jpg',//文件名字
	    //     path: 'uploads\\aaa.jpg',//文件地址
	    //     size: 33479 }
	// console.log(req.body.username)
	let username=req.body.username

	// console.log(req.file)
	
	//req.filename  头像名
	
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
	// 服务器静态化目录 app.use('/filename',express.static(path.join(process.cwd(),'./uploads')));
		let url=`${req.file.filename}`;
		// http = 'http://127.0.0.1:3000/'+url
		http = 'http://1.117.77.5:3000/'+url
		// console.log(http)
		let sql = "update app_users set headphoto=? where username=?"
		let parmas = [http,username];
		console.log(sql)
		db.exec(sql, parmas, (data) => {
				res.json({
					status: 200,
					msg: '头像上传成功,更新成功'
				})
		})
	
	}
})




// 导出表
module.exports=router
