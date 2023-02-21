// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {guahaoMsg,insertGuahaoMsg,SelfGuahaoMsg,delete_guahaoMsg}=require("../controllers/guahaoMsgController.js")

router.get('/guahaoMsg',guahaoMsg)
router.post('/insertGuahaoMsg',insertGuahaoMsg)
router.get('/SelfGuahaoMsg',SelfGuahaoMsg)
router.delete('/delete_guahaoMsg',delete_guahaoMsg)
// 导出表
module.exports=router