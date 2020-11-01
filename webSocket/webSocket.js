let http = require('http')
let fs = require('fs')
var socket = require('socket.io')
let server = http.createServer(async (req,res)=>{
    let url = req.url
    if(url==='/'){
        res.setHeader('content-type','text/html;charset=utf-8')
        res.end(fs.readFileSync('./example.html').toString());
    }
})


let io = socket(server)

io.on('connection', (socket) => {
    let welcomeMessage = {
        id:socket.id
    }
    socket.emit('hello', {
        id: socket.id
    });
    // 给除了自己以外的其它socket对象发送消息
    socket.broadcast.emit('welcome', welcomeMessage);

    socket.on('sendmessage',data=>{
        let message = {
            id:socket.id,
            message:data.message,
            time:new Date()
        }
        socket.emit('acceptmessage',message)
        
        socket.broadcast.emit('acceptmessage', message);
    })

  });

server.listen(8000,()=>{
    console.log('监听8000端口')
})