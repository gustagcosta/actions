import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import db from './db.js';

export const authentication = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db
      .select('*')
      .from('users')
      .where('id', '=', decoded.id)
      .first();

    delete user.password;

    req.user = user;
  }

  next();
});

export const authorization = (...permittedRoles) => {
  return (req, res, next) => {
    const { user } = req;

    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: process.env.ENV === 'production' ? null : err.stack,
  });
};
