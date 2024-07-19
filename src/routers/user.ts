import { Router } from 'express';
import { verifyToken } from '../utils/verifyToken';
import { register, login, getUser, getUsers } from '../controllers/user';

const router = Router();

// Sign up user.
router.post('/register', register);

// Login user.
router.post('/login', login);

// Get User.
router.get('/users/:id', verifyToken, getUser);

// Get All Users.
router.post('/users', verifyToken, getUsers);

export default router;
