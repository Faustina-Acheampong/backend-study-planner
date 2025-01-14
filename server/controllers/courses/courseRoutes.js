import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    archiveCourse,
  } from "./courseController.js";
import { authenticate } from "../../utils/authMiddleware.js";
import { validateRequiredFields } from "../../utils/courseMiddleware.js";

export const coursesRouter = express.Router();

const requiredFields = [
    "course_name",
    "course_day",
    "course_code",
    "course_instructor",
    "course_time",
  ];

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     description: This endpoint allows an authenticated user to create a new course in the system.
 *     tags:
 *       - Courses
 *     requestBody:
 *       description: The course details that need to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_name:
 *                 type: string
 *                 description: The name of the course.
 *                 example: "Introduction to Programming"
 *               course_day:
 *                 type: string
 *                 enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
 *                 description: The day the course takes place.
 *                 example: "Monday"
 *               course_code:
 *                 type: string
 *                 description: A unique code for the course (e.g., "CS101").
 *                 example: "CS101"
 *               course_instructor:
 *                 type: string
 *                 description: The name of the course instructor.
 *                 example: "Dr. Jane Doe"
 *               course_semester:
 *                 type: string
 *                 description: The semester in which the course is taught.
 *                 example: "Autumn-1"
 *               course_location:
 *                 type: string
 *                 description: The location where the course is held.
 *                 example: "Room 101, Building A"
 *               course_cover_image:
 *                 type: string
 *                 description: The URL to the course cover image.
 *                 example: "http://example.com/course-image.jpg"
 *               course_description:
 *                 type: string
 *                 description: A detailed description of the course.
 *                 example: "This course covers the basics of programming in Python."
 *               course_time:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: string
 *                     description: The start time of the course (HH:MM format).
 *                     example: "09:00"
 *                   end:
 *                     type: string
 *                     description: The end time of the course (HH:MM format).
 *                     example: "11:00"
 *               userId:
 *                 type: string
 *                 description: The ID of the user (authenticated user) creating the course.
 *                 example: "60d2b0d8e4e0d6d1d8b91f12"
 *     responses:
 *       201:
 *         description: Course created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Course created successfully"
 *                 data:
 *                   type: object
 *                   description: The course object that was created.
 *                   properties:
 *                     course_name:
 *                       type: string
 *                       example: "Introduction to Programming"
 *                     course_day:
 *                       type: string
 *                       example: "Monday"
 *                     course_code:
 *                       type: string
 *                       example: "CS101"
 *                     course_instructor:
 *                       type: string
 *                       example: "Dr. Jane Doe"
 *                     course_semester:
 *                       type: string
 *                       example: "Autumn-1"
 *                     course_location:
 *                       type: string
 *                       example: "Room 101, Building A"
 *                     course_cover_image:
 *                       type: string
 *                       example: "http://example.com/course-image.jpg"
 *                     course_description:
 *                       type: string
 *                       example: "This course covers the basics of programming in Python."
 *                     course_time:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                           example: "09:00"
 *                         end:
 *                           type: string
 *                           example: "11:00"
 *       400:
 *         description: Validation failed (e.g., missing required fields, incorrect data formats).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: "course_name"
 *                       message:
 *                         type: string
 *                         example: "Course name is required"
 *       500:
 *         description: Server error when creating the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error creating course. Please try again."
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

coursesRouter.post("/", authenticate, validateRequiredFields(requiredFields), createCourse);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses with optional filters
 *     description: This endpoint retrieves all courses from the database with optional filters for course name, day, instructor, semester, code, and status.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: query
 *         name: course_name
 *         schema:
 *           type: string
 *         description: Filter courses by name. Supports partial matching (case-insensitive).
 *       - in: query
 *         name: course_day
 *         schema:
 *           type: string
 *           enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
 *         description: Filter courses by day of the week.
 *       - in: query
 *         name: course_instructor
 *         schema:
 *           type: string
 *         description: Filter courses by instructor name. Supports partial matching (case-insensitive).
 *       - in: query
 *         name: course_semester
 *         schema:
 *           type: string
 *         description: Filter courses by semester (e.g., "Autumn-1").
 *       - in: query
 *         name: course_code
 *         schema:
 *           type: string
 *         description: Filter courses by course code. Supports partial matching (case-insensitive).
 *       - in: query
 *         name: course_status
 *         schema:
 *           type: string
 *           enum: ["Ongoing", "Upcoming", "Completed", "Archived"]
 *         description: Filter courses by their status.
 *     responses:
 *       200:
 *         description: Courses retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       course_name:
 *                         type: string
 *                       course_day:
 *                         type: string
 *                       course_code:
 *                         type: string
 *                       course_instructor:
 *                         type: string
 *                       course_semester:
 *                         type: string
 *                       course_location:
 *                         type: string
 *                       course_cover_image:
 *                         type: string
 *                       course_description:
 *                         type: string
 *                       course_time:
 *                         type: object
 *                         properties:
 *                           start:
 *                             type: string
 *                           end:
 *                             type: string
 *       400:
 *         description: Bad request due to invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error when retrieving courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

coursesRouter.get("/", getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     description: This endpoint retrieves a single course from the database by its unique ID.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to retrieve.
 *     responses:
 *       200:
 *         description: Course retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     course_name:
 *                       type: string
 *                     course_day:
 *                       type: string
 *                     course_code:
 *                       type: string
 *                     course_instructor:
 *                       type: string
 *                     course_semester:
 *                       type: string
 *                     course_location:
 *                       type: string
 *                     course_cover_image:
 *                       type: string
 *                     course_description:
 *                       type: string
 *                     course_time:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                         end:
 *                           type: string
 *       404:
 *         description: Course not found for the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error when retrieving the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

coursesRouter.get("/:id", getCourseById);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     description: This endpoint updates the details of an existing course. Only the user who created the course can update it.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID of the person trying to update the course.
 *               course_name:
 *                 type: string
 *               course_day:
 *                 type: string
 *               course_code:
 *                 type: string
 *               course_instructor:
 *                 type: string
 *               course_semester:
 *                 type: string
 *               course_location:
 *                 type: string
 *               course_cover_image:
 *                 type: string
 *               course_description:
 *                 type: string
 *               course_time:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: string
 *                   end:
 *                     type: string
 *               course_status:
 *                 type: string
 *                 enum: [Ongoing, Upcoming, Completed, Archived]
 *               is_archived:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     course_name:
 *                       type: string
 *                     course_day:
 *                       type: string
 *                     course_code:
 *                       type: string
 *                     course_instructor:
 *                       type: string
 *                     course_semester:
 *                       type: string
 *                     course_location:
 *                       type: string
 *                     course_cover_image:
 *                       type: string
 *                     course_description:
 *                       type: string
 *                     course_time:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                         end:
 *                           type: string
 *       400:
 *         description: Invalid data provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       403:
 *         description: You are not authorized to update this course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Course not found for the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error when updating the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

coursesRouter.put("/:id", authenticate, updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     description: This endpoint deletes a course by its ID. Only the user who created the course can delete it.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to delete.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID of the person trying to delete the course.
 *     responses:
 *       200:
 *         description: Course deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       403:
 *         description: You are not authorized to delete this course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Course not found for the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error when deleting the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */


coursesRouter.delete("/:id", authenticate, deleteCourse);

/**
 * @swagger
 * /api/courses/{id}/archive:
 *   patch:
 *     summary: Archive a course by ID
 *     description: This endpoint archives a course by its ID. The course can only be archived if there are no pending assignments and it is not ongoing.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to archive.
 *     responses:
 *       200:
 *         description: Course archived successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: The archived course object.
 *       400:
 *         description: Course cannot be archived due to pending assignments or ongoing status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 reasons:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Course not found for the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error when archiving the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

coursesRouter.patch("/:id/archive", authenticate, archiveCourse);
