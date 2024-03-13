const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  // 接続先を指定しcorserrorを無くす
  cors: {
    origin: ['http://localhost:3000']
  }
})

const PORT = 5000

// クライアントと通信
io.on('connection', Socket => {
  console.log('クライアントと接続しました')
  // クライアントからの受信
  Socket.on('send_message', ({ id, name, message }) => {
    console.log(id, name, message)
    // クライアントへの送信
    io.emit('received_message', { id, name, message })
  })
  Socket.on('disconnect', () => {
    console.log('クライアントと接続が切れました')
  })
})

server.listen(PORT, () => console.log(`server is running on ${PORT}`))
