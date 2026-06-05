import express from 'express';
import router from './routes/index.router.js';
import { ENV } from '../config/app.config.js';
import path from "path";
import { errorMiddleware } from './middlewares/errorHandler.middleware.js';

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.use('/api/v1', router);
app.use(express.static("client"));
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'health point is working'
  });
});
app.use(errorMiddleware);

export default app;