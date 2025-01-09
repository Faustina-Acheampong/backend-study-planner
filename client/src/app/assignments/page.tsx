"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "IN PROGRESS" | "NOT STARTED" | "FINISHED";
  due_date: string;
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
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="rounded-lg border bg-white shadow-lg p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-900">Tasks</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="rounded-md border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Add a new task"
        className="mb-4 w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 tracking-wide">
                Task
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 tracking-wide">
                Category
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 tracking-wide">
                Course ID
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 tracking-wide">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700 tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(showAll ? assignments : assignments.slice(0, 10)).map(
              (assignment) => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <Link href={`/assignments/${assignment.id}`}>
                      {assignment.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {assignment.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {assignment.course_id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatDate(assignment.due_date)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        assignment.status === "IN PROGRESS" ||
                        assignment.status === "In Progress"
                          ? "bg-blue-500"
                          : assignment.status === "NOT STARTED" ||
                            assignment.status === "Not Started"
                          ? "bg-gray-400"
                          : assignment.status === "Done" ||
                            assignment.status === "FINISHED"
                          ? "bg-green-500"
                          : assignment.status === "PENDING" ||
                            assignment.status === "Pending"
                          ? "bg-orange-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <button
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-200"
        onClick={handleShowMoreClick}
      >
        {showAll ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
