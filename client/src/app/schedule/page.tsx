"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { TaskType } from "@/types/task";

/* schedule calendar view */

/* tasks list */

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (selectedDate) {
      fetchTasksByDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchTasksByDate = async (date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const response = await axios.get<TaskType[]>(
        `http://localhost:8000/api/tasks/tasks-by-date`,
        {
          params: { date: formattedDate },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container">
     
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Schedule Page</h1>
        <div className="bg-white rounded-lg shadow-lg p-4 ">
          {/* Month View Calendar */}
          <div className="mb-6 flex flex-col items-center">
            <Calendar

              onClickDay={handleDayClick} 
              value={selectedDate}
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">
                Tasks for {selectedDate.toDateString()}:
              </h2>
              <ul className="list-disc list-inside mt-2">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <li key={task.id} className="text-gray-700">
                      <strong>{task.task_title}</strong> ({task.task_priority}{" "}
                      priority) - {task.task_priority}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No tasks for this day.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
