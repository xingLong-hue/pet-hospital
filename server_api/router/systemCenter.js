// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {alterPassword}=require("../controllers/systemCenterController.js")

router.post('/alterPassword',alterPassword)


// 导出表
module.exports=router