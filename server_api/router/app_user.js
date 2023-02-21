// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {getUserslist,update_appUsers,delete_appUsers,add_app,appuser,adds,update_pasd,insert_msg,mySelfMsg}=require("../controllers/appUserController.js")
// 
router.get('/getlist',getUserslist)
router.put('/update_appUsers',update_appUsers)
router.delete('/delete_appUsers',delete_appUsers)
router.post('/add_appUsers',add_app)

router.get('/appuser',appuser)
router.post('/update_pasd',update_pasd)
// 移动端的
// 注册
router.post('/addUsers',adds)
// 设置用户信息
router.post('/insert_msg',insert_msg)
// 获取个人基本信息
router.get('/mySelfMsg',mySelfMsg)




// 导出表
module.exports=router