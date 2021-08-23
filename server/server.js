import { config } from 'dotenv';
config();

import express, { json } from 'express';

import userRoutes from './api/users.js';
import { authentication, errorHandler } from './middleware.js';

const app = express();

app.use(json());
app.use(authentication);

app.get('/api', async (req, res) => {
  res.json({ version: '1.0.0' });
});

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`It's alive! http://localhost:${process.env.PORT}`);
});
