"use client";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "IN PROGRESS" | "NOT STARTED" | "FINISHED";
  course_id: number;
}

export default function AssignmentPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/assignments/?${course_id}`
        );
        setTasks(response.data);
        console.log("data", response.data);

        setLoading(false);
      } catch (err: unknown) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      Single Assignment Page
      {/* page with all details about one assignment */}
      {/* fetch data by id from url */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="rounded-md border pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Add a new task"
        className="rounded-md border pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="divide-y">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300" />

              <span className="font-medium text-gray-900">{task.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{task.dueDate}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  task.status === "IN PROGRESS"
                    ? "bg-yellow-100 text-yellow-800"
                    : task.status === "NOT STARTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
