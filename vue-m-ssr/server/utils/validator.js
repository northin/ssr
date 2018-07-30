let validator = {}


//验证邮箱
validator.isEmail = function(string) {
	var result = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(string);
	return result;
}


//验证用户名
validator.isName = function(string){
	var result = /[a-z0-9\_\_]{6,16}/.test(string)

	return result
}


//验证密码
validator.isPassword = function(string){
	var result = /[\w+]{6,16}/.test(string)
	return result
}


//




module.exports = validator


