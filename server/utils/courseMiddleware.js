import mongoose from "mongoose";

// Middleware for validating course data
export const validateRequiredFields = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: `Missing required fields: ${missingFields.join(', ')}` 
        });
    }
    next();
};

// Middleware for validating user_id
export const validateUserId = async (req, res, next) => {
    const { user_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: "Invalid user_id format" });
    }

    const userExists = await User.findById(user_id);
    if (!userExists) {
        return res.status(400).json({ message: "User not found" });
    }

    next();
};