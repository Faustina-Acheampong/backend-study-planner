import express from 'express';
export const authRouter = express.Router();
import { login } from './login.js';
import { logout } from './logout.js';
import { refresh } from './refresh.js';
import { register } from './register.js';

authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);
authRouter.post('/register', register)
