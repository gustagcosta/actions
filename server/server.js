import { config } from 'dotenv';
config();

import express, { json } from 'express';
import path from 'path';

import userRoutes from './api/users.js';
import { authentication } from './middleware.js';

const app = express();

app.use(json());
app.use(authentication);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(path.resolve(), 'client', 'build', 'index.html'))
  );
} else {
  app.get('/api', async (req, res) => {
    res.json({ version: '1.0.0' });
  });
}

app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`It's alive! http://localhost:${process.env.PORT}`);
});
