const Router = require('koa-router');
const fs = require("fs")
const path = require('path')
var Vue = require("vue")
const createRenderer = require('vue-server-renderer').createRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const serverManifest = require('../.././dist/vue-ssr-server-bundle.json')
const clientManifest = require('../.././dist/vue-ssr-client-manifest.json')
const resolve = file => path.resolve(__dirname, file)

let ssr = new Router();
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
ssr.get("*",async (ctx,next) => {
    const renderer = createBundleRenderer(serverManifest, {
        runInNewContext: false, 
        template: fs.readFileSync('./index.template.html', 'utf-8'), 
        clientManifest:clientManifest,
        basedir: resolve('../././dist'),
    })
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
    let html,status
    try {
        html = await renderData(ctx, renderer)
    } catch (e) {
        if (e.code === 404) {
            status = 404
            html = '404 | Not Found'
        }else{
            status = 500
            html = '500 | Internal Server Error'
            console.error(`error during render : ${ctx.url}`)
        }
    }
    ctx.type = 'html'
    
    ctx.status = status ? status : ctx.status
    console.log(ctx.status)
    console.log(html)
    ctx.body = html
})

module.exports = ssr















