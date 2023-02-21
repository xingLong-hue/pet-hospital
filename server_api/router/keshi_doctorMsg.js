// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {keshi_doctorMsg}=require("../controllers/keshi_doctorMsgController.js")

router.get('/keshi_doctorMsg',keshi_doctorMsg)


// 导出表
module.exports=router