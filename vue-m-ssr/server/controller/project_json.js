const fs = require('fs')

async function getJson(ctx){
	let catData = ctx.request.body;
	let jsonName = catData.jsonName;
	//lookWhat
	let file = './data/'+jsonName+'.json';
	let data = JSON.parse(fs.readFileSync( file));

	ctx.body = data;

}


module.exports = {
	getJson:getJson
}
