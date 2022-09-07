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

    // koa使用：中间件 server.use()
    // ctx 记录了请求内容+返回内容：
    //      ctx.path 路径
    //      ctx.method 请求方法
    //      ctx.body 返回的html
    //      ctx.request, ctx.response & ctx.req, ctx.res的区别
    // next 下一个中间件
    server.use(async (ctx,next)=>{
        await handle(ctx.req, ctx.res)
        ctx.respond=false
        await next()
    })

    server.listen(3000,()=>{
        console.log("Koa server listening on 3000")
    })
})