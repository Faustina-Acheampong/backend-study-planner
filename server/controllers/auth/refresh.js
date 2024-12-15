import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import { REFRESH_SECRET, SECRET } from '../../utils/config.js';

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired refresh token' });
    }
}
