const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/koa2-demo')

let db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', function(){
	console.log("mongoodb连接失败")
})
db.on('open', function(){
	console.log("mongoodb连接成功")
})


//声明schema

const userSchema = mongoose.Schema({
	email: String,
	password: String,
	token: String,
	create_time: Date
})

const model = {
	User: mongoose.model('User', userSchema)
}

module.exports = model;


