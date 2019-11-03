
const events = require('events');
const net = require('net');
const myEmitter = new events.EventEmitter();

const server = net.createServer(socket => {
    socket.on(data=>{
        console.log(data)
    })
})

// 没有监听器 会停止执行
// myEmitter.on('error',(error)=> {
//     console.log(`ERROR:${error.message}`);
// });

// 没有指定错误类型 停止执行
// myEmitter.emit('error', new Error('报错啦'))


server.listen('6666')