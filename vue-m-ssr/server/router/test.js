const Router = require('koa-router')
const test1 = require('./../controller/test')
// const Redis=require('ioredis');

// const redis=new Redis({
//     host : '127.0.0.1',//安装好的redis服务器地址
//     port : 6379,　//端口
//     prefix : 'test:',//存诸前缀
//     ttl : 60 * 60 * 23,//过期时间
//     db: 0
// });
let test = new Router();

test.get( '/', test1.testPage )
// test.get('/session', async (ctx) => {
// 	redis.set("test","kwg kwg kwg");
//     const doc = await redis.get('test',function(err, doc){
//     	return doc
//     })
//     ctx.body = doc;
// })

module.exports = test