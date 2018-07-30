const Router = require('koa-router');

let error = new Router();
error.get('*', async (ctx) => {
	let html = `
		<h1>error page</h1>
	`
	ctx.body = html;
})


module.exports = error















