import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/verifyToken';
import { ILogin, User } from '../types/userTypes';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const payload = req.body as User;
  try {
    payload.password = bcrypt.hashSync(payload.password, 8);
    const user = await prisma.user.create({
      data: payload,
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: any = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw 'User Not Found';

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw 'Email address or password not valid';

    const token = generateToken(req.body);
    res.json({ ...user, token });
  } catch (error) {
    console.error('Error loggin in: ', error);
    res.status(500).json({ error: 'Failed to Login' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
};

export const getUsers = async (_: any, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed getting users' });
  }
};
