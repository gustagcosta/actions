import express from 'express';
import bcrypt from 'bcryptjs';

import db from '../db.js';
import { validateEmail, generateToken, verifyPassword } from '../utils.js';
import { authorization } from '../middleware.js';

const router = express.Router();

// @desc      Register a user and send the token
// @route     POST /api/users
// @access    Public
router.post('/', async (req, res) => {
  const { name, email, password, role = 'common' } = req.body;

  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Invalid email' });
  }

  if (name.length < 3) {
    res.status(400).json({ message: 'Name must have 3 caracteres or more' });
  }

  if (password.length < 3) {
    res
      .status(400)
      .json({ message: 'Password must have 3 caracteres or more' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password, salt);

    const user = await db
      .select('*')
      .from('users')
      .where('email', '=', email)
      .first();

    if (user) {
      res
        .status(409)
        .json({ message: 'User with this email already registered' });
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
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'An error occurred in register' });
  }
});

// @desc      Verify user and send the token
// @route     POST /api/users/login
// @access    Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const user = await db
      .select('*')
      .from('users')
      .where('email', '=', email)
      .first();

    if (!user) {
      res.status(404).json({ message: 'User with this email not found' });
    }

    if (!(await verifyPassword(password, user.password))) {
      res.status(403).json({ message: "Passwords don't match" });
    }

    const token = generateToken(user.id);

    res.send({
      name: user.name,
      email,
      role: user.role,
      id: user.id,
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'An error occurred in login' });
  }
});

// @desc      Send info of logged user
// @route     GET /api/users/profile
// @access    all logged in users
router.get(
  '/profile',
  authorization('common', 'manager', 'admin'),
  async (req, res) => {
    res.json(req.user);
  }
);

// @desc      Get the list of users
// @route     GET /api/users/
// @access    Admin
router.get('/', authorization('admin'), async (req, res) => {
  try {
    res.send(await db('users'));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Load users failed' });
  }
});

// @desc      Update user
// @route     PUT /api/users/
// @access    Admin
router.put('/', authorization('admin'), async (req, res) => {
  const { id, name, email, role } = req.body;

  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Invalid email' });
  }

  if (name.length < 3) {
    res.status(400).json({ message: 'Name must have 3 caracteres or more' });
  }

  if (!['admin', 'common', 'manager'].includes(role)) {
    res.status(400).json({ message: 'Invalid role' });
  }

  try {
    await db('users').where('id', '=', id).update({
      name,
      email,
      role,
    });

    res.json({ message: 'User updated' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Admin
router.delete('/:id', authorization('admin'), async (req, res) => {
  try {
    await db('users').where('id', '=', req.params.id).delete();
    res.json({ message: 'User deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error updating user' });
  }
});

export default router;
