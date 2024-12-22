"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "IN PROGRESS" | "NOT STARTED" | "FINISHED";
}

export default function TasksSection() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Assignment 3",
      dueDate: "15 september 2023",
      status: "IN PROGRESS",
    },
    {
      id: 2,
      title: "Assignment 3",
      dueDate: "12 January 2025",
      status: "NOT STARTED",
    },
    {
      id: 3,
      title: "Assignment 3",
      dueDate: "09 march 2025",
      status: "FINISHED",
    },
    {
      id: 3,
      title: "Assignment 4",
      dueDate: "10 july 2025",
      status: "NOT STARTED",
    },
    {
      id: 3,
      title: "Assignment 5",
      dueDate: "30 January 2025",
      status: "IN PROGRESS",
    },
  ]);

  return (
    <div className="rounded-lg border p-6">
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
