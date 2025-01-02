import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  // task model
  task_title: { type: String, required: true },  
  task_description: { type: String },
  task_due_date: { type: Date },
  is_task_completed: { type: Boolean, default: false },  
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
    required: false, //  as optional
    default: null,
  },
  time: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Time',
    }
  ],
 

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
