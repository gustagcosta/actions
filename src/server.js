import { config } from 'dotenv';
import express, { json } from 'express';
config();

const app = express();

app.use(json());

app.get('/', async (req, res, next) => {
  res.json({ version: '1.0.0' });
});

import userRoutes from './api/users.js';

app.use('/api/users', userRoutes);

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.ENV === 'production' ? null : err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`It's alive! http://localhost:${process.env.PORT}`);
});
