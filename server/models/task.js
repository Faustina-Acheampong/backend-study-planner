import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task_title: { type: String, required: true },  // snake_case field name
  task_description: { type: String },
  task_due_date: { type: Date },
  is_task_completed: { type: Boolean, default: false },  // Changed to Boolean for frontend compatibility
  task_priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  task_status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
  },
  time: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Time',
    }
  ],
 // task model
//  taskTitle: { type: String, required: true },
//  taskDescription: { type: String },
//  taskDueDate: { type: Date },
//  taskStatus: {
//    type: String,
//    enum: ['pending', 'completed'],
//    default: 'pending',
//  },
//  taskPriority: {
//    type: String,
//    enum: ['Low', 'Medium', 'High'],
//    default: 'Medium',
//  },
//  isTaskCompleted: { type: Boolean, default: false },
//  userId: {
//    type: mongoose.Schema.Types.ObjectId,
//    ref: 'User',
//    required: true,
//  },
});

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
