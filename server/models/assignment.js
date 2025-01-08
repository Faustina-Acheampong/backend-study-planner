import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  cover_image: {
    type: String,
    maxlength: 250,
  },
  due_date: {
    type: Date,
    required: true,
  },
  participants: {
    type: [Number],
    default: [],
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

assignmentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
