const modelService = require('../service/user_info')
const userCode = require('../utils/userCode')
const createToken = require('../token/createToken')
// const Redis=require('ioredis');

// const redis=new Redis({
//     host : '127.0.0.1',//安装好的redis服务器地址
//     port : 6379,　//端口
//     prefix : 'test:',//存诸前缀
//     ttl : 60 * 60 * 23,//过期时间
//     db: 0
// });

//登录
async function signIn( ctx ) {
	let formData = ctx.request.body;
	let result = {
		success : false,
		message : '',
		data : null,
		code : ''
	}

	let userResult = await modelService.signIn(formData);

	if(!userResult.isExist){
		result.message = userCode.FAIL_USER_NO_EXIST
		result.code = 'FAIL_USER_NO_EXIST'
	}else{
		if( userResult.result.password != formData.password ){
			result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        	result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
		}else{
			result.success = true
			result.message = userCode.SUCCESS
			result.code = 'SUCCESS'

			let token = createToken(formData.email)
			// redis.set("");
			result.token = token;
		}



	}
	ctx.body = result
}

//注册
async function register(ctx){

	let formData = ctx.request.body;
	let result = {
		success : false,
		message : '',
		data : null,
		code : ''
	}


	let isValid = await modelService.validatorSignUp(formData);

	if(isValid.success){

		let isExist = await modelService.getInfoOne(formData)

		if(isExist.isExist){
			result.message = userCode.FAIL_USER_NAME_IS_EXIST
			console.log(result)
			return;
		}



	}else{
		result.message = isValid.message
		console.log(result)
		return
	}



	let userResult = await modelService.create({
		email: formData.email,
		password: formData.password,
		name: formData.userName,
		conformPassword: formData.conformPassword,
		create_time: new Date().getTime(),
		level: 1,
	})

	console.log(userResult)

	if ( userResult && userResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = userResult.message
      result.code = userCode.ERROR_SYS
    }

    ctx.body = result

}
//登出
async function signOut(ctx){
	let formData = ctx.request.body;
	let result = {
		success : false,
		message : ''
	}
	
}



async function getLoginUserInfo(ctx){
	let result = {
		message: 'hello token'
	}
	ctx.body = result
}

module.exports = {
	signIn: signIn,
	register: register,
	getLoginUserInfo: getLoginUserInfo
}

// register({
// 	email:'admin001@example.com',
// 	password:'12341516',
// 	conformPassword: '12341516',
// 	name:"asd1231sd"
// })






















