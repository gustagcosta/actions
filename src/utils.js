import { config } from 'dotenv';
config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const validateEmail = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return re.test(String(email).toLowerCase());
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const verifyPassword = async (enteredPassword, password) => {
  return await bcrypt.compare(enteredPassword, password);
};
