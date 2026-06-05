import { Client } from 'pg';
import { ENV } from '../config/app.config';
import { logger } from '../Libs/logger';
import io from '../socket-resources/index.socket';
let pgClient;

export const initializePostgresListener = async () => {
  try {

    pgClient = new Client({
      host: ENV.DB_HOST,
      port: Number(ENV.DB_PORT),
      user: ENV.DB_USER_NAME,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME
    });

    await pgClient.connect();
    logger.info({ message: "PG Connected" })

    await pgClient.query('LISTEN order_changes');
    logger.info({ message: "Listening..." })

    pgClient.on(
      'notification',
      (msg) => {
        const payload = JSON.parse(
          msg.payload
        );
        logger.info({ payload, message: "Received Notification" })

        io.emit("order_changed",
          payload)

      }
    );

  } catch (error) {

    logger.error({ message: 'error in connection weith pg client', error })
    throw error
  }
};
