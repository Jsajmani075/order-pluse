import { logger } from '../Libs/logger.js';
import io from './index.socket.js';

io.on('connection', (socket) => {

  logger.info({
    socketId: socket.id,
    message: "Client Connected"
  });
  try {
    socket.emit('connected', {
      message: 'connected successfully'
    })
    socket.on('disconnect', (reason) => {
      logger.warn({
        socketId: socket.id,
        reason,
        message: 'Client Disconnected'
      });

    })

    socket.on('error', (error) => {
      logger.error({
        socketId: socket.id,
        error: error?.message || error,
        stack: error?.stack,
        message: 'Socket Error'
      });
    })
  }
  catch (error) {
    logger.error({
      socketId: socket.id,
      error: error?.message,
      stack: error?.stack,
      message: 'Unexpected Socket Error'
    });

    socket.emit('error', {
      message: 'Internal Server Error'
    });
  }
})