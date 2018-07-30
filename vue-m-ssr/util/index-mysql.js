// const mysql = require('mysql');

// // 创建数据池
// const pool  = mysql.createPool({
//   host     : '127.0.0.1',   // 数据库地址
//   user     : 'root',    // 数据库用户
//   password : 'root'   // 数据库密码
//   database : '163'  // 选中数据库
// })


// pool.getConnection(function (err, connection) {
// 	connection.query(' select * FROM  singers', (error, results, fields) => {
// 		connection.release();

// 		if(err){
// 			throw err
// 		}
// 	})
// })

const fs = require('fs')
const getSqlContent = require("./get-sql-content-map")
const dbUtil = require("./dbUtil")

const logg = function(err, sqlFile, index){
	if(err){
		console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败`)
	}else{
 		console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功`)
	}
}

let sqlContent = getSqlContent()

const allTables = async () => {
	for(let key in sqlContent){
		let sqlShell = sqlContent[key];

		let sqlShellList = sqlShell.split(';')

		for(var [i, item] of sqlShellList.entries()){
			if(item.trim()){
				let result = await dbUtil.query(item)
				if ( result.serverStatus * 1 === 2 ) {
		          logg( null,  key, i)
		        } else {
		          logg( true,  key, i) 
		        }
			}
		}

	}
	console.log('sql脚本执行结束！')
	console.log('请按 ctrl + c 键退出！')
}


allTables()







