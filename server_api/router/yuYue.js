// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {yuYueMsg,insertyuYueMsg,SelfyuYueMsg,delete_yuYueMsg}=require("../controllers/yuYueMsgController.js")

router.get('/yuYueMsg',yuYueMsg)
router.post('/insertyuYueMsg',insertyuYueMsg)
router.get('/SelfyuYueMsg',SelfyuYueMsg)
router.delete('/delete_yuYueMsg',delete_yuYueMsg)
// router.delete('/delete_doctor',delete_doctorUsers)
// router.put('/update_doctor',update_doctorUsers)

// 导出表
module.exports=router