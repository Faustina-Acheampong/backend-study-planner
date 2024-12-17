import express from 'express';
import mongoose from'mongoose';
import Task from '../models/task.js';
import User from '../models/user.js';


export const tasksRouter = express.Router();


tasksRouter.post('/', (req, res) => {

});


tasksRouter.get('/', (req, res) => {
    res.json("Hello, tasks!");
  });
