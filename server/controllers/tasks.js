import express from "express";
import mongoose from "mongoose";
import Task from "../models/task.js";
import User from "../models/user.js";

export const tasksRouter = express.Router();

// Middleware for validating required fields
const validateRequiredFields = (requiredFields) => (req, res, next) => {
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  next();
};

// Middleware to validate the userId for tasks
const validateUserId = async (req, res, next) => {
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  const userExists = await User.findById(userId);
  if (!userExists) {
    return res.status(400).json({ message: "User not found" });
  }

  next();
};

// ROUTES

// Retrieve all tasks on GET request
tasksRouter.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("userId");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Create a new task from the request body
tasksRouter.post(
  "/",
  validateRequiredFields(["taskTitle", "userId", "taskDueDate"]),
  validateUserId,
  async (req, res) => {
    try {
      const {
        taskTitle,
        taskDescription,
        taskPriority,
        taskDueDate,
        isTaskCompleted,
        userId,
        assignmentId,
      } = req.body;

      const newTask = new Task({
        taskTitle,
        taskDescription,
        taskPriority,
        taskDueDate,
        isTaskCompleted: isTaskCompleted || false,
        userId,
        assignmentId,
      });

      await newTask.save();
      res.json(newTask);
    } catch (error) {
      console.error("Error adding task:", error.message || error);
      res
        .status(500)
        .json({ message: `Failed to add task: ${error.message || error}` });
    }
  }
);

// 3. Update a task
tasksRouter.put(
  "/:id",
  validateRequiredFields(["taskTitle", "userId"]),
  validateUserId,
  async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, maxTimeMS: 5000 }
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res
        .status(500)
        .json({ message: `Failed to update task: ${error.message || error}` });
    }
  }
);

// 4. Delete a task
tasksRouter.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res
      .status(500)
      .json({ message: `Failed to delete task: ${error.message || error}` });
  }
});

// Toggle task completion status
tasksRouter.patch("/:id/toggle-completed", async (req, res) => {
  try {
    const { id } = req.params; // Extract `id` from `req.params`

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isTaskCompleted = !task.isTaskCompleted;
    task.taskStatus = task.isTaskCompleted ? "completed" : "pending";

    await task.save({ validateModifiedOnly: true }); // Validate only modified fields

    res.json(task);
  } catch (error) {
    console.error("Error toggling task completion:", error);
    res
      .status(500)
      .json({
        message: `Failed to toggle task completion: ${error.message || error}`,
      });
  }
});

// Get tasks filtered by date (for calendar integration)
tasksRouter.get("/tasks-by-date", async (req, res) => {
  try {
    const { date } = req.query;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      taskDueDate: { $gte: startOfDay, $lte: endOfDay },
    }); // Find tasks with deadlines on the selected day

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks for date:", error);
    res
      .status(500)
      .json({
        message: `Failed to fetch tasks for the selected date: ${
          error.message || error
        }`,
      });
  }
});

// tasksRouter.post("/", (req, res) => {});

// tasksRouter.get("/", (req, res) => {
//   res.json("Hello, tasks! for testing purpose");
// });
