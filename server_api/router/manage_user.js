// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {getUsers,addUsers,DelUsers,UpdateUsers,Lists,delete_manage_users}=require("../controllers/ManageUserController.js")

router.get('/login',getUsers)
router.post('/addUser',addUsers)
router.post('/DelUser',DelUsers)
router.post('/UpdateUser',UpdateUsers)
router.get('/list',Lists)
router.delete('/delete_manage_users',delete_manage_users)
// 导出表
module.exports=router