const Infra = new (require('./server/Infra.class'))()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static('public'))

io.on('connection', function (socket) {
    Infra.get()
        .then((data) => {
            socket.emit('con', data)
        })
        .catch((ex) => console.log(ex))
})

Infra.event
    .on('netUp', (data) => io.sockets.emit('netUp', data))
    .on('netDown', (data) => io.sockets.emit('netDown', data))

server.listen(5678, () => console.log('Server start on 5678!'))
