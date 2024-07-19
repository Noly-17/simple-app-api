import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../types/userTypes';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
const SECRET = String(process.env.SECRET);

// middlewares
export const generateToken = (userPayload: User): string => {
  return jwt.sign(userPayload, SECRET, { expiresIn: '2w' });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    jwt.verify(token, SECRET) as User;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
