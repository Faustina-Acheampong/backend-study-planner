import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { loginRouter } from './controllers/login.js';
import { registerRouter } from './controllers/register.js';
import { usersRouter } from './controllers/users.js';
import { assignmentsRouter } from './controllers/assignments.js';
import { coursesRouter } from './controllers/courses.js';
import { notesRouter } from './controllers/notes.js';
import { tasksRouter } from './controllers/tasks.js';
import { timesRouter } from './controllers/times.js';

export const app = express();
mongoose.set('strictQuery', false);

console.log('Connecting to MongoDB database');
// mongoose.connect(MONGODB_URL)
//     .then(result => {
//         console.log('connected to MongoDB');
//     })
//     .catch((error) => {
//         console.log('error connecting to MongoDB:', error.message);
//     });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/user', usersRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/notes', notesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/times', timesRouter);
