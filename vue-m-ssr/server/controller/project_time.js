const fs = require('fs')

async function getTime(ctx){
	let catData = ctx.request.body;
	let musicName = catData.musicName;
	//lookWhat
	let file = './data/time'+musicName+'.json';
	let data = JSON.parse(fs.readFileSync( file));

	ctx.body = data;

}


module.exports = {
	getTime:getTime
}
