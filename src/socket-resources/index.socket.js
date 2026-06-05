import { Server as SocketServer } from 'socket.io'
import { ENV } from '../config/app.config'

const io = new SocketServer()

export default io;