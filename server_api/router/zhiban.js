// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {zhibanMsg,update_zhibanMsg,selfzhibanMsg,insert_zhibanMsg,delete_zhibanMsg}=require("../controllers/zhibanController.js")

router.get('/zhibanMsg',zhibanMsg)
router.put('/update_zhibanMsg',update_zhibanMsg)
router.get('/selfzhibanMsg',selfzhibanMsg)
router.post('/insert_zhibanMsg',insert_zhibanMsg)
router.delete('/delete_zhibanMsg',delete_zhibanMsg)
// 导出表
module.exports=router