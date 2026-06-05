import http from 'http';
import app from './src/rest-resources/index.js';
import { initializePostgresListener } from './src/Listeners/pg.listener.js';
import { logger } from './src/Libs/logger.js';
import io from './src/socket-resources/index.socket.js';
import './src/socket-resources/socket.event.js';
import { ENV } from './src/config/app.config.js';

const PORT = ENV.PORT;

const httpServer = http.createServer(app);
io.attach(httpServer);

(async () => {
  await initializePostgresListener();

  httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  });
})();