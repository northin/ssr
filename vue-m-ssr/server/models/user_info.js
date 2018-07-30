const dbUtil = require('../../util/dbUtil');


async function create( model ) {
	let returnData = await isExist(model)
	let resultData = {
		success: true,
		message: '插入成功'
	}
	if(returnData.isExist){
		resultData.success = false
		resultData.message = "该账号已被注册"
	}else{
		let result = await dbUtil.insertData('user_info', model)
		resultData.result = result
	}

	return resultData
}

async function isExist( model ) {
	let result = await dbUtil.selectOne('user_info', model)
	let returnData = {
		result: result[0],
		isExist: false
	}
	if(result != 0){
		returnData.isExist = true
	}

	return returnData
}




module.exports = userModel = {
	isExist : isExist,
	create  : create
}



















