"use client";
import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import axios from "axios";
import TasksWidget from "../tasks/TasksWidget";
import TaskComponent from "./TaskComponent";

const ScheduleWidget = () => {
  const [weeklyTasks, setWeeklyTasks] = useState<{ [key: string]: any[] }>({});
  const [weeklyCourses, setWeeklyCourses] = useState<{ [key: string]: any[] }>(
    {}
  );
  const [weeklyAssignments, setWeeklyAssignments] = useState<{
    [key: string]: any[];
  }>({});
  const [todayTasks, setTodayTasks] = useState<any[]>([]);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    fetchWeeklyTasks();
    fetchCourses();
    fetchAssignments();
  }, []);

  const fetchWeeklyTasks = async () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    ); // Start on Monday
    const promises = daysOfWeek.map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + index); // Increment for each day
      const formattedDate = date.toISOString().split("T")[0];
      return axios.get(`http://localhost:8000/api/tasks/tasks-by-date`, {
        params: { date: formattedDate },
      });
    });

    try {
      const results = await Promise.all(promises);
      const tasksByDay: { [key: string]: any[] } = {};
      daysOfWeek.forEach((day, index) => {
        tasksByDay[day] = results[index].data || [];
      });
      setWeeklyTasks(tasksByDay);
    } catch (error) {
      console.error("Error fetching weekly tasks:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/courses");
      console.log("Full API Response:", response.data); // Log the full response
  
      // Access the courses array inside the 'data' property of the response
      const courses = response.data.data || []; // Adjusted this to access the correct property
  
      if (Array.isArray(courses)) {
        const coursesByDay: { [key: string]: any[] } = {};
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach((day) => {
          coursesByDay[day] = courses.filter((course: any) => course.course_day === day);
        });
        setWeeklyCourses(coursesByDay);
      } else {
        console.error("Expected an array of courses, but got:", courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/assignments");
      const assignments = response.data || [];
      const assignmentsByDay: { [key: string]: any[] } = {};

      daysOfWeek.forEach((day) => {
        assignmentsByDay[day] = assignments.filter((assignment: any) => {
          const assignmentDate = new Date(assignment.due_date);
          const assignmentDay = assignmentDate.toLocaleDateString("en-US", {
            weekday: "long",
          });
          return assignmentDay === day;
        });
      });

      setWeeklyAssignments(assignmentsByDay);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/schedule"
          className="text-xl font-bold hover:underline cursor-pointer"
        >
          Calendar Week/Month View
        </Link>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Show All
        </button>
      </div>
      <div className=" gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <div
            key={day}
            className="p-4 rounded-lg shadow text-center bg-gray-300 hover:bg-gray-400 text-gray-900 transition my-4 font-semibold"
          >
            <h3 className="font-semibold mb-2">{day}</h3>
            <div className="bg-white rounded-lg shadow-inner p-2 mb-4">
              {/* Tasks Section */}
              <h4 className="text-sm font-bold mb-1">Task</h4>
              {weeklyTasks[day]?.length > 0 ? (
                weeklyTasks[day].map((task) => (
                  <div
                    key={task.id}
                    className="border-b last:border-0 py-1 text-left"
                  >
                    <h3 className="font-semibold mb-2 text-center">
                      {" "}
                      Task = {task.task_title}
                    </h3>
                    <h5 className="text-center">
                      {" "}
                      Description={" "}
                      {task.task_description || "No description provided."}
                    </h5>
                    <h4 className="text-sm text-center  text-gray-600">
                      {task.task_priority} Priority
                    </h4>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No tasks for this day</p>
              )}
            </div>

           
            {/* Courses Section */}
            <div className="bg-white rounded-lg shadow-inner p-2 mb-4">
              <h4 className="text-sm font-bold mb-1">Courses</h4>
              {weeklyCourses[day]?.length > 0 ? (
                  weeklyCourses[day].slice(0, 2).map((course) => (
                  <div key={course.id} className="border-b last:border-0 py-1 text-left">
                    <h3 className="font-semibold mb-2 text-center">{course.course_name}</h3>
                    <h5 className="text-center">{course.course_instructor}</h5>
                    <p className="text-center text-sm">{course.course_time.start} - {course.course_time.end}</p>
                    <p className="text-center text-sm">{course.course_location}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No courses for this day</p>
              )}
            </div>

            {/* Assignments Section (static, for now) */}
            {/* <div className="bg-white rounded-lg shadow-inner p-2">
              <h4 className="text-sm font-bold mb-1">Assignments</h4>
              <p className="text-sm text-gray-500">
                No assignments for this day
              </p>
            </div> */}
             <div className="bg-white rounded-lg shadow-inner p-2">
              <h4 className="text-sm font-bold mb-1">Assignments</h4>
              {weeklyAssignments[day]?.length > 0 ? (
                weeklyAssignments[day].slice(0, 2).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="border-b last:border-0 py-1 text-left"
                  >
                    <h3 className="font-semibold mb-2 text-center">a
                      Title = {assignment.title}
                    </h3>
                    <h5 className="text-center">
                      Due = {new Date(assignment.due_date).toLocaleDateString()}
                    </h5>
                    <h4 className="text-sm text-center text-gray-600">
                      Status = {assignment.status}
                    </h4>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No assignments for this day</p>
              )}
            </div>
        
          </div>
        ))}
      </div>
      <TaskComponent />
    </div>
  );
};

export default ScheduleWidget;
