const koa = require('koa')
const config = require("./config")
const router = require("./server/router/index")
const views = require('koa-views')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
// const session =  require("koa2-cookie-session")
const cors = require('koa2-cors');
var staticCache = require('koa-static-cache')
const staticFiles = require('koa-static')
// const createRenderer = require('vue-server-renderer').createRenderer
// const { createBundleRenderer } = require('vue-server-renderer')
// const serverManifest = require('./dist/vue-ssr-server-bundle.json')
// const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const app = new koa()

// 配置ctx.body解析中间件
app.use(bodyParser())
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './dist'

// app.use(staticFiles(
//   path.resolve( __dirname,  staticPath)
// ))
app.use(staticFiles(path.resolve(__dirname, staticPath), {
  maxAge: 365 * 24 * 60 * 60
}))


// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return '*'; //这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 50,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE','OPTIONS', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())





// 加载模板引擎
app.use(views(path.join(__dirname, './server/view'), {
  extension: 'ejs'
}))




app.listen(config.port, () => {
	console.log(`the server is start at port ${config.port}`)
})























