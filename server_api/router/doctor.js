// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {doctorUsers,add_doctorUsers,delete_doctorUsers,update_doctorUsers,
doctorIntroduceMsg,doctormsg,loginMsg,update_pasd,addsdoctor,insert_msg,
doctor_userMsg,add_doctotlistMsg,delete_doctorlistMsg,UpdatedoctorlistMsg}=require("../controllers/doctorController.js")

router.get('/doctoruser',doctorUsers)
router.post('/add_doctor',add_doctorUsers)
router.delete('/delete_doctor',delete_doctorUsers)
router.put('/update_doctor',update_doctorUsers)
router.get('/doctorIntroduceMsg',doctorIntroduceMsg)
router.get('/doctormsg',doctormsg)
router.get('/doctorLogin',loginMsg)
router.post('/update_pasd',update_pasd)
router.post('/addsdoctor',addsdoctor)
router.post('/insert_msg',insert_msg)

router.get('/doctor_userMsg',doctor_userMsg)

router.post('/add_doctotlistMsg',add_doctotlistMsg)
router.delete('/delete_doctorlistMsg',delete_doctorlistMsg)
router.put('/UpdatedoctorlistMsg',UpdatedoctorlistMsg)
// 导出表
module.exports=router