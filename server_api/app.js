const express = require("express")
const BodyParser=require('body-parser')
const qs=require('qs')
const path=require('path')
const mime=require('mime')



const manageUsersRouter=require("./router/manage_user.js")
const appUsersRouter=require('./router/app_user.js')

const doctorRouter=require('./router/doctor.js')

const hospitalRouter=require('./router/hospital.js')

const systemCenterRouter=require('./router/systemCenter.js')

const yuYueRouter=require("./router/yuYue.js")
const guahaoMsgRouter=require('./router/guahao.js')
const qingjiaRouter=require('./router/qingjia.js')
const dakaRouter=require('./router/daka.js')
const dangAnRouter=require('./router/dangAn.js')

const keshiRouter=require('./router/keshi.js')
const yi_liaoRouter=require('./router/yi_liao.js')

const keshi_doctorMsgRouter=require('./router/keshi_doctorMsg.js')

const zhibanRouter=require('./router/zhiban.js')
const uploadRouter=require('./router/upload.js')
const PetphotoRouter=require('./router/uploadPetphoto.js')
const doctorHeadphotoRouter=require('./router/doctorHeadphoto.js')

const app = express()
const token=require('./module/token.js')
// 配置解析请求体// 方法一
app.use(express.urlencoded())

// 配置解析请求体方法二
// app.use(BodyParser({extended:false}))



//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Content-Type", mime.getType(req.path));
  res.header("Content-Type", "application/json;charset=utf-8");
 
  next();

})

// 配置静态资源
// app.use('/public',express.static('./public'))
app.use(express.static('public/img'))



// 给app定义使用哪张路由表
app.use('/api/manage_users',manageUsersRouter)
app.use('/api/app_users',appUsersRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/hospital',hospitalRouter)

app.use('/api/systemCenter',systemCenterRouter)

app.use('/api/yuYue',yuYueRouter)
app.use('/api/guahaoMsg',guahaoMsgRouter)
app.use('/api/qingjia',qingjiaRouter)
app.use('/api/daka',dakaRouter)
app.use('/api/dangAn',dangAnRouter)
app.use('/api/keshi',keshiRouter)
app.use('/api/yi_liao',yi_liaoRouter)
app.use('/api/keshi_doctorMsg',keshi_doctorMsgRouter)
app.use('/api/zhiban',zhibanRouter)
app.use('/api/upload',uploadRouter)
app.use('/api/uploadPetphoto',PetphotoRouter)
app.use('/api/doctorHeadphoto',doctorHeadphotoRouter)
// avar_1649489460848-1761688554031846.jpeg



app.listen(3000, function() {
	console.log("服务器接口已经运行在3000端口了.............")
});