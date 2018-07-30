
// const Router = require('koa-router');
const home = require('./home')
const error = require('./error')
const api = require('./api')
const test = require('./test')
// const ssr = require("./ssr")
const Router = require('koa-router');
const fs = require("fs")
const path = require('path')
var Vue = require("vue")
const createRenderer = require('vue-server-renderer').createRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const serverManifest = require('../.././dist/vue-ssr-server-bundle.json')
const clientManifest = require('../.././dist/vue-ssr-client-manifest.json')
const resolve = file => path.resolve(__dirname, file)
//装载路由
let router = new Router();

const renderData = (ctx, renderer) => {
    const context = {
        url: ctx.url
    }
    return new Promise( (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return reject(err)
            }
            resolve(html)
        })
    })
}

// router.use('/', home.routes(), home.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())
// // router.use('/page', page.routes(), page.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

router.get("*",async (ctx,next) => {
    const renderer = createBundleRenderer(serverManifest, {
        runInNewContext: false, 
        template: fs.readFileSync('./index.template.html', 'utf-8'), 
        clientManifest:clientManifest,
        // basedir: resolve('/'),
    })

    // require('../../build/setup-dev-server.js')(app, (bundle, options) => {
    //     console.log('bundle callback..')
    //     renderer = createRenderer(bundle, options)
    //     console.log(renderer)
    // })

    // const context = {
    //     title: 'Vue HN 2.0', // default title
    //     url: ctx.request.url
    //   }
    // renderer.renderToString(context,(err,html) => {
    //     if (err) {
    //         // if(err)
    //             console.log(err)
    //             ctx.body = "error"
    //         // }
    //     } else {
            // res.end(html)
    //         console.log(html)
    //         ctx.type = 'html'
    //         ctx.body = html
    //     }
    // })
    // console.log(renderer)
    let html,status
    try {
        html = await renderData(ctx, renderer)
    } catch (e) {
        console.log(e)
        if (e.code === 404) {
            status = 404
            html = '404 | Not Found'
        }else{
            // console.log(e)
            status = 500
            html = '500 | Internal Server Error'
            console.error(`error during render : ${ctx.url}`)
        }
    }
    ctx.type = 'html'
    
    // ctx.status = status ? status : ctx.status
    // console.log(ctx.status)
    // console.log(html)
    ctx.body = html
})



// router.use('/test', test.routes(), test.allowedMethods() )

module.exports = router







