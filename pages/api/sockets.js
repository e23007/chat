import cors from 'cors'
import { Server } from 'socket.io'

const corsMiddleware = cors()

// Next.jsのAPIルーティングの入り口となる関数
const SocketHandler = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  if (res.socket.server.io) {
    return res.send('already-set-up')
  }
  // Socket.IOのサーバーを作成する
  const io = new Server(res.socket.server, {
    addTrailingSlash: false
  })
  // クライアントと通信
  io.on('connection', socket => {
    console.log('クライアントと接続しました')
    // クライアントからの受信
    socket.on('send_message', ({ id, name, message }) => {
      console.log(id, name, message)
      // クライアントへの送信
      io.emit('received_message', { id, name, message })
    })
    socket.on('disconnect', () => {
      console.log('クライアントと接続が切れました')
    })
  })
  // CORS対策を一応、有効にした上でサーバーを設定する
  corsMiddleware(req, res, () => {
    res.socket.server.io = io
    res.end()
  })
}
export default SocketHandler
