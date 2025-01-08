"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "IN PROGRESS" | "NOT STARTED" | "FINISHED";
}

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleShowMoreClick = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/assignments/"
        );
        setAssignments(response.data);
        console.log("data", response.data);

        setLoading(false);
      } catch (err: unknown) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log("assignment page");

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
        </div>
      </div>

      <div className="divide-y">
        {(showAll ? assignments : assignments.slice(0, 3)).map((assignment) => (
          <div
            key={assignment.id}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300" />

              <span className="font-medium text-gray-900">
                {assignment.title}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {assignment.dueDate}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  assignment.status === "IN PROGRESS"
                    ? "bg-yellow-100 text-yellow-800"
                    : assignment.status === "NOT STARTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {assignment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        onClick={handleShowMoreClick}
      >
        {showAll ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
