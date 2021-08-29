import { config } from 'dotenv';
config();
import express, { json } from 'express';
import path from 'path';

import db from './db.js';
import { authentication } from './middleware.js';
import userRoutes from './api/users.js';
import tasksRoutes from './api/tasks.js';

const app = express();

app.use(json());
app.use(authentication);
app.use((req, res, next) => {
  req.db = db;
  next();
})

app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes);

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

app.listen(process.env.PORT, () => {
  console.log(`It's alive! http://localhost:${process.env.PORT}`);
});
