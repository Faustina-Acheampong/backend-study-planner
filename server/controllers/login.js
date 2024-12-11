import { SECRET } from '../utils/config.js';
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import express from 'express';
import User from '../models/user.js';
export const loginRouter = express.Router();

// all routes here
loginRouter.post('/', (req, res) => {

});
