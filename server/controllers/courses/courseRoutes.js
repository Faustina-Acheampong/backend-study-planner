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


coursesRouter.post("/", authenticate, validateRequiredFields(requiredFields), createCourse);

coursesRouter.get("/", getAllCourses);

coursesRouter.get("/:id", getCourseById);

coursesRouter.put("/:id", authenticate, updateCourse);

coursesRouter.delete("/:id", authenticate, deleteCourse);

coursesRouter.patch("/:id/archive", authenticate, archiveCourse);
