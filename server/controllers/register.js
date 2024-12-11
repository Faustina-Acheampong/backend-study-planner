import express from 'express';
import bcryptjs from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';
export const registerRouter = express.Router();

registerRouter.post('/', (req, res) => {

});
