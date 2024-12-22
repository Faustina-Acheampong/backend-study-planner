import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

 // task model
 taskTitle: { type: String, required: true },
 taskDescription: { type: String },
 taskDueDate: { type: Date },
 taskStatus: {
   type: String,
   enum: ['pending', 'completed'],
   default: 'pending',
 },
 taskPriority: {
   type: String,
   enum: ['Low', 'Medium', 'High'],
   default: 'Medium',
 },
 isTaskCompleted: { type: Boolean, default: false },
 userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true,
 },
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
