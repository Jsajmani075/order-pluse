import http from 'http'
import app from './src/rest-resources'
import socketServer from './src/socket-resources/index.socket'


export const server = http.createServer(app)
