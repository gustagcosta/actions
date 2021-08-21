import { config } from 'dotenv';
config();

import express, { json } from 'express';

import userRoutes from './api/users.js';
import { errorHandler, notFound } from './middleware.js';

const app = express();

app.use(json());

app.get('/', async (req, res) => {
  res.json({ version: '1.0.0' });
});

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`It's alive! http://localhost:${process.env.PORT}`);
});
