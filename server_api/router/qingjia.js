// 配置信息相关的路由表
const express = require("express")
// 数据库的操作
const db=require('../db.js')

const router=express.Router()

const {qingjiaList,updata_qingjiaMsg,tijiao,self_qingjiaMsg}=require("../controllers/qingjiaController.js")

router.get('/qingjiaList',qingjiaList)
router.put('/updata_qingjiaMsg',updata_qingjiaMsg)
router.post('/tijiao',tijiao)
router.get('/self_qingjiaMsg',self_qingjiaMsg)
// 导出表
module.exports=router