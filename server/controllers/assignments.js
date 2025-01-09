import express from "express";
import Assignment from "../models/assignment.js";
import mongoose from "mongoose";

export const assignmentsRouter = express.Router();

// get all the assignments
assignmentsRouter.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch assignments" });
  }
});

// get assignment according to CourseID
assignmentsRouter.get("/course/:course_id", async (req, res) => {
  const courseId = req.params.course_id;
  console.log("course id", courseId);

  try {
    const assignments = await Assignment.find({ course_id: courseId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch assignments" });
  }
});

// get by id
assignmentsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const assignments = await Assignment.findById(id);
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch assignments" });
  }
});

// add a single assignment
assignmentsRouter.post("/", async (req, res) => {
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
      message: "Assignment created successfully",
      assignment: savedAssignment,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create assignment",
      error: error.message,
    });
  }
});

//Delete a single assignment
assignmentsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json({
      message: "Assignment deleted successfully",
      assignment: deletedAssignment,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete assignment", error: error.message });
  }
});

// update a single assignment
assignmentsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment: updatedAssignment,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update assignment", error: error.message });
  }
});
