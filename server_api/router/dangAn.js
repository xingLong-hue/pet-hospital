// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {dangAnMsg,daleteDangAnMsg,postPetMsg,getPetMsg,updatePet}=require("../controllers/dangAnMsgController.js")

router.get('/dangAnMsg',dangAnMsg)
// router.post('/add_doctor',add_doctorUsers)
router.delete('/deleteDangAnMsg',daleteDangAnMsg)
router.post('/postPetMsg',postPetMsg)
router.get('/getPetMsg',getPetMsg)
router.post('/updatePet',updatePet)
// 导出表
module.exports=router