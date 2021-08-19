import { config } from 'dotenv';
import express, { json } from 'express';
import db from "./db.js";

config();

const app = express();

app.use(json());

app.get('/', async (req, res, next) => {
  try {
    const result = await db('test');
    res.json(result);
  } catch (e) {
    next(e);
  }
});

const errorHandler = (err, req, res, next) => {
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`It's alive! http://localhost:${process.env.PORT}`);
});
