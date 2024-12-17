import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  // task model
  title: { type: String, required: true },
  description: String,
  deadline: Date,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  completed: { type: Boolean, default: false },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
