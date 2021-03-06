import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/container';
import createDbConnection from '../typeorm';

const app = express();

createDbConnection();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
