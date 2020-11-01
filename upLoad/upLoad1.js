let Koa = require('koa')
let Router = require('koa-router')
let koaBody = require('koa-body')
let fs = require('fs')
const KoaStaticCache = require('koa-static-cache');//加载静态资源
// let cors = require('koa2-cors');//解决跨域

let app = new Koa()
let router = new Router()


// app.use(cors())//解决跨域
app.use(KoaStaticCache({
    dir: __dirname + '/',
    prefix: '/',
    gzip: true,
    dynamic: true
}))
app.use(koaBody({
    // 支持文件格式
    multipart: true,
    formidable: {
        uploadDir: __dirname + '/images',
        keepExtensions: true
    }
}))


app.use(router.routes())

router.post('/upload',async (ctx,next)=>{
    
    // let imagePath = ctx.request.files.image.path
    // let imageName = ctx.request.files.image.name
    // let imageData = fs.readFileSync(imagePath)
    // fs.writeFileSync('images/'+imageName,imageData)
    ctx.body = {
        message:"上传成功"
    }
})

app.listen(8000,()=>{
    console.log('文件上传后台启动，监听8000端口')
})
