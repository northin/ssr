const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
	if(ctx.request.header['authorization']){
		let token = ctx.request.header['authorization'].split(' ')[1]

		let decoded = jwt.decode(token, 'zhangchunxu');
		if(token && decoded.exp <= new Date()/1000){
			ctx.status = 401;
            ctx.body = {
                message: 'token过期'
            };
		}else{
			return next();
		}
	}else{
		ctx.status = 401;
        ctx.body = {
            message: '没有token'
        }
	}
}

// module.exports = async ( ctx, next ) => {
//     const authorization = ctx.get('Authorization');
//     if (authorization === '') {
//         ctx.throw(401, 'no token detected in http header "Authorization"');
//     }
//     const token = authorization.split(' ')[1];
//     let tokenContent;
//     try {
//         tokenContent = await jwt.verify(token, 'zhangchunxu');     //如果token过期或验证失败，将抛出错误
//     } catch (err) {
//         ctx.throw(401, 'invalid token');
//     }
//     await next();
// }



















