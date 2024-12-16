import express from 'express';
import Assignment from '../models/assignment.js';
import mongoose from 'mongoose';

export const assignmentsRouter = express.Router();

assignmentsRouter.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
});

assignmentsRouter.get('/:[id]', async (req, res) => {
  try {
    const assignments = await Assignment.findById();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
});

assignmentsRouter.post('/', async (req, res) => {
  try {
    const {
      title,
      category,
      status,
      due_date,
      participants,
      course_id,
      created_at,
    } = req.body;

    const newAssignment = new Assignment({
      title,
      category,
      status,
      due_date,
      participants,
      course_id,
      created_at,
    });

    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment: savedAssignment,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create assignment',
      error: error.message,
    });
  }
});
