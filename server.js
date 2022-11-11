const next = require('next')
const Koa=require('koa')
const Router = require('koa-router')

const dev=process.env.NODE_ENV !== 'production'
const app=next({dev})
const handle=app.getRequestHandler()

app.prepare().then(()=>{
    // 基础koa
    const server=new Koa()
    const router = new Router()
	// 首页
    router.get('/', async ctx => {
      await app.render(ctx.req, ctx.res, '/', ctx.query)
      ctx.respond = false
    })

    server.use(async (ctx,next)=>{
        await handle(ctx.req, ctx.res)
        ctx.respond=false
        await next()
    })

    server.listen(3000,()=>{
        console.log("Koa server listening on 3000")
    })
})