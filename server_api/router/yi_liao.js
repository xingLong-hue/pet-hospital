// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {yi_liaoMsg,yi_liaoMsg2,update_yiliaoMsg,delete_yiliaoMsg,add_yiliaoMsg}=require("../controllers/yi_liaoController.js")

router.get('/yi_liaoMsg',yi_liaoMsg)
router.get('/yi_liaoMsg2',yi_liaoMsg2)
// router.post('/add_doctor',add_doctorUsers)
router.delete('/delete_yiliaoMsg',delete_yiliaoMsg)
router.put('/update_yiliaoMsg',update_yiliaoMsg)
router.post('/add_yiliaoMsg',add_yiliaoMsg)
// 导出表
module.exports=router