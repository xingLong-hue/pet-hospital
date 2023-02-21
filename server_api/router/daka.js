// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {dakaMsg,daka,self_dakaMsg,insert_dakaMsg,delete_dakaMsg}=require("../controllers/dakaMsgController.js")

router.get('/dakaMsg',dakaMsg)
// router.post('/add_doctor',add_doctorUsers)
// router.delete('/delete_doctor',delete_doctorUsers)
//更新打卡
router.put('/daka',daka)

router.get('/self_dakaMsg',self_dakaMsg)

// 插入新的信息
router.post('/insert_dakaMsg',insert_dakaMsg)

router.delete('/delete_dakaMsg',delete_dakaMsg)

// 导出表
module.exports=router