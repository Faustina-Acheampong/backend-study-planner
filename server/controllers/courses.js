import express from 'express';
import Course from '../models/course.js';

export const coursesRouter = express.Router();

// Middleware for validating course data (Refactor into middleware file later).
const validateRequiredFields = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: `Missing required fields: ${missingFields.join(', ')}` 
        });
    }
    next();
};

const requiredFields = ['course_name', 'course_day', 'course_code', 'course_instructor', 'course_time', 'user_id'];


// POST request to create a new course
coursesRouter.post('/', validateRequiredFields(requiredFields), async (req, res) => {
    try {
        const course = new Course(req.body);
        const savedCourse = await course.save();
        res.status(201).json({ message: 'Course created succesfully', savedCourse});

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: Object.entries(error.errors).map(([field, err]) => ({
                    field,
                    message: err.message
                }))
            });
        }
        res.status(500).json({ message: 'Error creating course. Please try again later.' });  
    }
});
