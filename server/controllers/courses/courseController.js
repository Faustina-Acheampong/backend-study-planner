import Course from '../../models/course.js';


export const createCourse = async (req, res) => {
    try {
      const { userId } = req.body; // From authMiddleware
      const courseData = { ...req.body, user_id: userId };
  
      const course = new Course(courseData);
      const savedCourse = await course.save();
  
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: savedCourse,
      });
    } catch (error) {
      console.error("Error creating course:", error.message);
  
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: Object.entries(error.errors).map(([field, err]) => ({
            field,
            message: err.message,
          })),
        });
      }
  
      res.status(500).json({
        success: false,
        message: "Error creating course. Please try again.",
        error: error.message,
      });
    }
  };

  export const getAllCourses = async (req, res) => {
    try {
      // Extract filter parameters from query string
      const {
        course_name,
        course_day,
        course_instructor,
        course_semester,
        course_code,
        course_status,
      } = req.query;
  
      // Create an empty filter object to store the filters
      const filter = {};
  
      // Add filters only if they exist in query params
      if (course_name) {
        filter.course_name = { $regex: course_name, $options: "i" }; // Case-insensitive search
      }
      if (course_day) {
        filter.course_day = course_day;
      }
      if (course_instructor) {
        filter.course_instructor = { $regex: course_instructor, $options: "i" };
      }
      if (course_semester) {
        filter.course_semester = course_semester;
      }
      if (course_code) {
        filter.course_code = { $regex: course_code, $options: "i" };
      }
      if (course_status) {
        filter.course_status = course_status;
      }
      // Retrieve courses from the database using the filter object
      const courses = await Course.find(filter).sort({ createdAt: -1 }); // Sort newest first
  
      // Check if any courses are found
      if (courses.length === 0) {
        return res.status(200).json({
          success: true,
          data: [],
          message: "No courses found matching the filters.",
        });
      }
      // Return the filtered courses
      res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
      });
    } catch (error) {
      console.error("Error retrieving courses:", error);
  
      // Handle server and other errors
      res.status(500).json({
        success: false,
        error: "Error retrieving courses. Please try again.",
        details: error.message,
      });
    }
  };

  export const getCourseById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find course by ID
      const course = await Course.findById(id);
  
      // Check if course exists
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found. Please check the ID and try again.",
        });
      }
      
      // Return the course if found
      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error retrieving course by ID:", error);
  
      // Handle errors related to invalid ID format or other server issues
      res.status(500).json({
        success: false,
        error: "Error retrieving course. Please try again.",
        details: error.message,
      });
    }
  };

  export const updateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const updateData = req.body;
  
      const course = await Course.findById(id);
  
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }
  
      if (course.user_id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this course",
        });
      }
  
      const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      });
    } catch (error) {
      console.error("Error updating course:", error);
  
      res.status(500).json({
        success: false,
        message: "Error updating course. Please try again.",
        error: error.message,
      });
    }
  };

  export const deleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
  
      const course = await Course.findById(id);
  
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }
  
      if (course.user_id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this course",
        });
      }
  
      await Course.findByIdAndDelete(id);
  
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting course:", error);
  
      res.status(500).json({
        success: false,
        message: "Error deleting course. Please try again.",
        error: error.message,
      });
    }
  };


  export const archiveCourse = async (req, res) => {
    try {
      const { id } = req.params;
  
      const course = await Course.findById(id);
  
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const { canArchive, reasons } = await course.canBeArchived();
  
      if (!canArchive) {
        return res.status(400).json({
          success: false,
          message: "Course cannot be archived",
          reasons: reasons,
        });
      }
  
      // Update the course status and archive flag
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        {
          course_status: "Archived",
          is_archived: true,
        },
        {
          new: true,
          runValidators: true,
        }
      );
  
      res.status(200).json({
        success: true,
        message: "Course archived successfully",
        data: updatedCourse,
      });
    } catch (error) {
      console.error("Error archiving course:", error);
      res.status(500).json({
        success: false,
        message: "Error archiving course. Please try again.",
        error: error.message,
      });
    }
};

