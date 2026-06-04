import { Server as SocketServer } from 'socket.io'
import { server } from '../..'
import { ENV } from '../config/app.config'

const socketServer = new SocketServer(server, {
  cors: {
    origin: [ENV.ALLOWED_ORIGIN],
    credentials: true
  }
})

export default socketServer
