import User from '../../models/user.js';

export const logout = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { refreshToken },
            { $unset: { refreshToken: '' } }
        );

        if (!user) {
            return res.status(400).json({ error: 'Invalid refresh token' });
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error during logout' });
    }
};
