const fs = require('fs');

//path路径， mime文件类型
let walkFile = function(path, mime){
	const files = fs.readdirSync(path);

	let fileList = {}

	for(var [i, item] of files.entries()){
		let itemArr = item.split('\.');

		let itemMime = itemArr.length != 1?itemArr[itemArr.length-1]:'undefined';
		
		if(itemMime === mime){
			fileList[item] = path + item
		}
	}

	return fileList
}
// console.log(walkFile('D://koa2/sql','sql'))

module.exports = walkFile



















