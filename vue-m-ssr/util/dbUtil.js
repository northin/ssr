const mysql = require('mysql');
const config = require('../config.js')

// 创建数据池
const pool  = mysql.createPool({
  host     : config.mysql.host,   // 数据库地址
  user     : config.mysql.user,    // 数据库用户
  password : config.mysql.password,   // 数据库密码
  database : config.mysql.database  // 选中数据库
})

let dbUtil = {}
//参数 tablename: 表名
//     model    : 一个表的bean
// 返回 如果插入成功 : {success: true} 
	//   失败 : {success: false}
	// 需要在async的函数中 用await调用
dbUtil.insertData = async (tablename, model) => {
	//先查数据库，把表的字段获取
	let sql = "select * from "+ tablename +" limit 1";

	let list = await dbUtil.query(sql)
	let insertSql = "insert into "+ tablename + " set ";
	for(var item in list[0]){
		if(model[item] != undefined){
			insertSql += item + "=" + "'" + model[item] + "'" + ",";
		}
		
	}

	insertSql = insertSql.substr(0,insertSql.length-1);

	let returnObj = await dbUtil.query(insertSql);
	// console.log(returnData);
	// let returnData = {
	// 	success: true,
	// }

	// if(returnObj.affectedRows !== 1){
	// 	returnData.success = false
	// }
	// console.log(returnData)
	return returnObj
}

// 参数
// tablename : 表名
// array     : 想要查询的字段，不写或写[]为全部
// condition : 条件
// groupBy   : 排序
// 返回  array类型
// dbUtil.select('user_info',[],["name='admin002'"]
dbUtil.select = async (tablename, array, conditions, groupBy) => {
	let sql;
	if(array == undefined || array == 0){
		sql = "select * from " + tablename;
	}else{
		sql = "select ";
		for(var item of array){
			sql += item + ','
		}
		sql = sql.substr(0, sql.length - 1) + ' from ' + tablename
	}

	if(condition != undefined || condition != 0){
		sql += ' where ';
		for(var condition of conditions){
			sql += condition + ' and '
		}
		sql = sql.substr(0, sql.length - 4)
	}

	if(groupBy != undefined){
		sql += "groupBy" + groupBy
	}
	console.log(sql)
	return await dbUtil.query(sql)
}


//参数 tablename: 表名
//     model    : 一个表的bean
// 返回 如果查询成功 : [OkPacket{filedCount:0....}]
	//   失败 : []
	// 需要在async的函数中 用await调用

dbUtil.selectOne = async (tablename, model) => {
	//先查数据库，把表的字段获取
	let sql = "select * from "+ tablename +" limit 1";
	let list = await dbUtil.query(sql)

	let sqlSelect = "select * from " + tablename + ' where ';

	for(var item in list[0]){
		if(model[item] != undefined && item !== 'create_time'){
			sqlSelect += item + '=' + '"'+ model[item] + '"' + ' and '
		}
		
	}
	
	sqlSelect = sqlSelect.substr(0,sqlSelect.length - 4) + 'limit 1';

	console.log(sqlSelect);
	return await dbUtil.query(sqlSelect)

}

dbUtil.query = function(sql, value){
	return new Promise((resolve, reject) => {

		pool.getConnection(function(err, connection){
			if(err){
				reject(err)
			}
			connection.query(sql, value , (err, results) => {
				if(err){
					throw err
				}

				resolve(results);

				connection.release()
			})
		})
	})
}





// async function dd(){
// 	let returndata = await dbUtil.selectOne('user_info',{'name':'admin003'});
// 	console.log(returndata)
// }
// dd()
module.exports = dbUtil


















