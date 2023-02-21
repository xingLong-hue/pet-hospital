// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {hospital_introduce,update_introduce,hospitalMsg,delete_hospitalMsg,update_hospitalMsg,add_hospitalMsg}=require("../controllers/hospitalController.js")

router.get('/hospitalMsg',hospital_introduce)
router.put('/update_introduce',update_introduce)

router.get('/hospitalMsg2',hospitalMsg)
router.delete('/delete_hospitalMsg2',delete_hospitalMsg)
router.put('/update_hospitalMsg2',update_hospitalMsg)
router.post('/add_hospitalMsg',add_hospitalMsg)
// 导出表
module.exports=router