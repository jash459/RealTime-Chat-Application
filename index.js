const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('msg_send', (data) => {
    console.log(data)
    io.emit('msg_rcvd', data)  // using io all client , all client react
    // socket.emit('msg_rcvd', data)  // now other browser will not react, it is for same client\
    // socket.broadcast.emit('msg_rcvd', data) // except the original one , other client will recieve message
  })
})

app.use('/', express.static(__dirname + '/public'))

server.listen(3000, () => {
  console.log('server started')
})
