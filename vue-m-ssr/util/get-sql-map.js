
const fs = require('fs');
const walkFile = require("./walkFile");



function getSqlMap(){
	let baseDir = __dirname;

	baseDir = baseDir.replace(/\\/g,'\/');

	let pathArr = baseDir.split('\/');

	pathArr = pathArr.splice(0, pathArr.length - 1 );

	let path = pathArr.join('/') + '/sql/';

	let fileList = walkFile(path,'sql');

	return fileList;
}

// console.log(getSqlMap())

module.exports = getSqlMap
















