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
        res.status(201).json({ 
            success: true,
            message: 'Course created succesfully', 
            data: savedCourse
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors: Object.entries(error.errors).map(([field, err]) => ({
                    field,
                    message: err.message
                }))
            });
        }
        res.status(500).json({ message: 'Error creating course. Please try again.' });  
    }
});

// Retrieve all courses
coursesRouter.get('/', async (req, res) => {
    try {
        // Fetch courses sorted by creation date (newest first)
        const courses = await Course.find().sort({ createdAt: -1 }); 
        
        // If no courses found, return an empty array and a message
        if (courses.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: [],
                message: 'No courses found. Please add a course.' 
            });
        }

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Error retrieving courses:', error);
        res.status(500).json({
            success: false,
            error: 'Error retrieving courses. Please try again.',
            details: error.message
         });         
    }
});

// Retrieve a single course by ID
coursesRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        // Check if course exists or not
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found. Please check the ID and try again.'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Error retrieving course by ID:', error);
        
        // Handle invalid ID format or server errors
        res.status(500).json({
            success: false,
            error: 'Error retrieving course. Please try again.',
            details: error.message
        });
    }
});

// Retrieve all courses by optional filters
coursesRouter.get('/', async (req, res) => {
    try {
        // Extract filter parameters from query string
        const {
            course_name,
            course_day,
            course_instructor,
            course_semester,
            course_code,
          } = req.query;

        // Build filter object
        const filter = {};
        
        // Add filters only if they exist in query params

       if (course_name) {
        filter.course_name = { $regex: course_name, $options: 'i' }; // Case-insensitive search
       }
       if (course_day) {
        filter.course_day = course_day;
       }
       if (course_instructor) {
        filter.course_instructor = { $regex: course_instructor, $options: 'i' };
       }
       if (course_semester) {
        filter.course_semester = course_semester;
       }
       if (course_code) {
        filter.course_code = { $regex: course_code, $options: 'i' };
       }

        
        const courses = await Course.find(filter).sort({ createdAt: -1 }); // Sort newest first

        // Check if any courses are found
        if (courses.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No courses found matching the filters.',
            });
        }

        // Return the filtered courses
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });

    } catch (error) {
        console.error('Error retrieving courses:', error);

        // Handle server and other errors
        res.status(500).json({
            success: false,
            error: 'Error retrieving courses. Please try again.',
            details: error.message,
        });
    }
});
