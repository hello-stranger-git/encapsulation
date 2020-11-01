let Koa = require('koa')
let Router = require('koa-router')
let koaBody = require('koa-body')
let fs = require('fs')
let app = new Koa()
let router = new Router()
app.use(koaBody({
    multipart:true
}))



router.post('/upload',async (ctx,next)=>{
    let imagePath = ctx.request.files.image.path
    let imageName = ctx.request.files.image.name
    let imageData = fs.readFileSync(imagePath)
    fs.writeFileSync('images/'+imageName,imageData)
    ctx.body = {
        message:"上传成功"
    }
})

app.use(router.routes())
app.listen(8888,()=>{
    console.log('文件上传后台启动，监听8888端口')
})
