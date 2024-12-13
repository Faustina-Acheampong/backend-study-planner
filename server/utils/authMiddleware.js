import jwt from 'jsonwebtoken';
import { SECRET } from './config.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
