const events = require('events');
const net = require('net');
// node  内置事件发射器
const channel = new events.EventEmitter;
channel.clients = {};
channel.subscriptions = {};

// 声明一个事件发射器 等待发射器发射
// const join = (id, client) => {
//     channel.clients[id] = client;
//     channel.subscriptions[id] = (senderId, message) => {
//         console.log('广播')
//         if (id != senderId) {
//             channel.clients[id].write(message);
//         }
//     };

//     channel.on('broadcast', channel.subscriptions[id])
// }



channel.on('join',function(id,client) {

    this.clients[id] = client;
    this.subscriptions[id] = (senderId,message) => {
       console.log('广播')
       if (id != senderId) {
           this.clients[id].write(message);
       }
    };

    this.on('broadcast',this.subscriptions[id])
});

channel.on('join',function(id,client) {
    const welcome=`Welcome!Guestsonline:${this.listeners('broadcast').length}`;
    client.write(`${welcome}\n`);
    // channel.emit('broadcast','',`${welcome}\n`)
})

channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, `${id} has left chatroom`)
})

channel.on('shutdown', function () {
    channel.emit('broadcast', '', 'the server has shut down. \r\n');
    channel.removeAllListeners('broadcast')
})

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`
    // channel.emit('join', id, client);
    // join(id, client)
    channel.emit('join', id, client)
    client.on('data', data => {
        data = data.toString();
        console.log(data == 'shutdown\r\n')
        if (data == 'shutdown\r\n') {
            channel.emit('shutdown')
        }
        channel.emit('broadcast', id, data)
    })

    client.on('close', () => {
        console.lof('退出')
        channel.emit('leave', id)
    })

})
// 设置监听器数量
channel.setMaxListeners(50);
server.listen(8888)
