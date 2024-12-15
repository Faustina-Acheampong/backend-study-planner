import bcryptjs from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../../models/user.js';

export const register = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        const saltRounds = 10;
        const passwordHash = await bcryptjs.hash(password, saltRounds);

        const user = new User({
            username,
            email,
            passwordHash
        });

        try {
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ error: 'Email or username already exists' });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }
];
