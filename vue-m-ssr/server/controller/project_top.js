
const fs = require('fs')

async function getTop10(ctx){
	let catData = ctx.request.body;
	let catId = catData.catId;
	//总排名0//华语1//欧美2//日本3//韩国4//其他5
	// let file = 'D:/web/node框架/koa-m/data/data'+catId+'.json';
	let file = './data/data'+catId+'.json';
	let data = JSON.parse(fs.readFileSync( file));

	ctx.body = data;

}


module.exports = {
	getTop10:getTop10
}














