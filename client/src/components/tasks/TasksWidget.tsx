import React, { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  id: number;
  task_title: string;
  task_description: string;
  task_priority: string;
}
const TasksWidget = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchTasks = async () => {
      const todayFormatted = new Date().toISOString().split("T")[0];

      try {
        const response = await axios.get(
          "http://localhost:8000/api/tasks/tasks-by-date",
          {
            params: { date: todayFormatted },
          }
        );
        setTasks(response.data);
      } catch (err) {
        setError("Failed to load tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-row p-4 border text-center bg-purple-100 hover:bg-purple-200 text-gray-900 transition my-4 font-semibold rounded-lg shadow-inner">
      <div className="text-center p-6 bg-gray-300 hover:bg-gray-400 rounded-xl shadow-lg flex-row">
        <h1 className="font-semibold bg-white rounded-lg shadow-inner p-2 mb-4 flex flex-row justify-center">
          Today's Tasks
        </h1>
        <div>
          {loading ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="my-2">
                <h3 className="text-sm text-gray-600 bg-white rounded-lg shadow-inner p-2 mb-4">
                  {task.task_title}
                </h3>
                <p className="text-sm text-gray-600 bg-white rounded-lg shadow-inner p-2 mb-4">
                  {task.task_description || "No description available"}
                </p>
                <p className="text-sm text-gray-600 bg-white rounded-lg shadow-inner p-2 mb-4">
                  Priority: {task.task_priority}
                </p>
              </div>
            ))
          ) : (
            <p>No tasks for today</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TasksWidget;
