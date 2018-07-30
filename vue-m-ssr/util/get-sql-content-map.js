const fs = require('fs');
const getSqlMap = require('./get-sql-map');

let sqlContentMap = {}

function getSql(){
	let sqlfile = getSqlMap()
	for(var item in sqlfile){

		getContent(item,sqlfile[item])
	}
	return sqlContentMap
}


function getContent(fileName, path){
	let content = fs.readFileSync(path, 'binary')
	sqlContentMap[fileName] = content
}



module.exports = getSql




