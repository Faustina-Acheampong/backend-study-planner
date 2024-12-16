import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { REFRESH_SECRET, SECRET } from '../../utils/config.js';
import User from '../../models/user.js';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts. Please try again later.'
});

export const login = [
    loginLimiter,
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            const isPasswordCorrect = user && await bcryptjs.compare(password, user.passwordHash);

            if (!user || !isPasswordCorrect) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const userForToken = { username: user.username, id: user._id };
            const accessToken = jwt.sign(userForToken, SECRET, { expiresIn: '15min' });
            const refreshToken = jwt.sign(userForToken, REFRESH_SECRET, { expiresIn: '7d' });

            user.refreshToken = refreshToken;
            await user.save();

            res.status(200).send({ accessToken, refreshToken, user: { username: user.username, id: user.id } });
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
];
