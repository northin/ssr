const jwt = require('jsonwebtoken')


module.exports = function(email){
	const token = jwt.sign({
		email : email
	},"zhangchunxu", {
		expiresIn: '600s'
	});
	return token
}


