import express from 'express';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import db from '../db.js';
import { validateEmail, generateToken, verifyPassword } from '../utils.js';
import { auth } from '../middleware.js';

const router = express.Router();

// @desc      Register a user and send the token
// @route     POST /api/users
// @access    Public
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { name, email, password, role = 'common' } = req.body;

    if (!validateEmail(email)) {
      res.status(400);
      throw new Error('Invalid email');
    }

    if (name.length < 3) {
      res.status(400);
      throw new Error('Name must have 3 caracteres or more');
    }

    if (password.length < 3) {
      res.status(400);
      throw new Error('Password must have 3 caracteres or more');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password, salt);

    const user = await db
      .select('*')
      .from('users')
      .where('email', '=', email)
      .first();

    if (user) {
      res.status(409);
      throw new Error('User with this email already registered');
    }

    const result = await db('users').insert({
      name,
      email,
      password: passwordCrypt,
      role,
    });

    const token = generateToken(result[0]);

    res.send({
      name,
      email,
      role,
      id: result[0],
      token,
    });
  })
);

// @desc      Verify user and send the token
// @route     POST /api/users/login
// @access    Public
router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      res.status(400);
      throw new Error('Invalid email');
    }

    const user = await db
      .select('*')
      .from('users')
      .where('email', '=', email)
      .first();

    if (!user) {
      res.status(404);
      throw new Error('User with this email not found');
    }

    if (!(await verifyPassword(password, user.password))) {
      res.status(403);
      throw new Error("Passwords don't match");
    }

    const token = generateToken(user.id);

    res.send({
      name: user.name,
      email,
      role: user.role,
      id: user.id,
      token,
    });
  })
);

// @desc      Send info of logged user
// @route     GET /api/users/
// @access    Private
router.get('/', [auth], async (req, res, next) => {
  res.send(req.user);
});

export default router;
