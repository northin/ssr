const userModel = require('../models/user_info')
const userCode = require('../utils/userCode')
const validtor = require('../utils/validator')
//注册
//参数
//	formData: user的对象
//	返回{success: true,message: '插入成功'}
//
async function create (user) {
	let result = await userModel.create(user)
	return result
}
//得到一个用户的信息
//参数
//	formData: 表单数据 {email:'1236@qq.com',...}
//	返回{result: {...},isExist: true}
//

async function getInfoOne (formData) {
	let result = await userModel.isExist({
		"email": formData.email,
		"name" : formData.name
	})

	return result
}
//登录
//参数
//	formData: 表单数据 {email:'1236@qq.com',...}
//	返回{result: {...},isExist: true}
//

async function signIn (formData) {
	let result = await userModel.isExist({
		"email": formData.email,
		// "password" : formData.password
	})

	
	
	return result
}


//查询用户信息
//参数 username
//返回{email:'111', username: '11',...}
//

async function infoQuery( username ){
	let resultData = await userModel.isExist({
		"name": username
	})

	let userInfo = {
      email: resultData.email,
      userName: resultData.name,
      detailInfo: resultData.detail_info,
      createTime: resultData.create_time
    }
    return userInfo
}



//验证用户注册信息
//参数userInfo
//返回{}	
function validatorSignUp ( userInfo ) {
	let result = {
		success: false,
		message: ''
	}

	if( !validtor.isName(userInfo.name) ){
		result.message = userCode.ERROR_USER_NAME
		return result
	}

	if( !validtor.isEmail(userInfo.email) ){
		result.message = userCode.ERROR_EMAIL
		return result
	}

	if( !validtor.isPassword(userInfo.password) ){
		result.message = userCode.ERROR_PASSWORD
		return result
	}

	if( userInfo.password != userInfo.conformPassword ){
		result.message = userCode.ERROR_PASSWORD_CONFORM
		return result

	}


	result.success = true

	return result
}






module.exports = userService = {
	create : create,
	getInfoOne : getInfoOne,
	signIn : signIn,
	infoQuery : infoQuery,
	validatorSignUp : validatorSignUp
}






