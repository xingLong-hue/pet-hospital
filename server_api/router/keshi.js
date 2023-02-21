// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {keshiMsg}=require("../controllers/keshiController.js")

router.get('/keshiMsg',keshiMsg)

// 导出表
module.exports=router