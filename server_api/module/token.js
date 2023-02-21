// 导入jsonwebtoken插件，生成token
const jwt=require('jsonwebtoken')

Token={
	// 加密token
	en(str){
		// 第一个需要加密的，第二个可以随便写，用于加入到token里的，必须是字符串的,加密、解密这两个需要保持一致
		let tokenkey=jwt.sign(str,"xinglong");
		return tokenkey;
	},
	// 解密token
	de(token){
		try{
			let tokenkey=jwt.verify(token,"xinglong");
			return {
				status:"success",
				tokenkey:tokenkey
			}
		}catch{
			return {
				status:"faile"
			}
		}
	}
}
module.exports={
	Token
}