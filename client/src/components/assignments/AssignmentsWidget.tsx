"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Assignment {
  id: number;
  courseName: string;
  assignmentName: string;
  dueDate: string;
  category: string;
  status: string;
  due_date: string;
  title: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const getRandomAssignments = (assignments: Assignment[]): Assignment[] => {
  const shuffled = [...assignments].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};

const AssignmentsWidget = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/assignments/"
        );
        setAllAssignments(response.data);
        setAssignments(getRandomAssignments(response.data));
        setLoading(false);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
    if (showAll) {
      setAssignments(getRandomAssignments(allAssignments));
    } else {
      setAssignments(allAssignments);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-4">Random Assignments</h2>
        <button
          onClick={toggleShowAll}
          className="mr-2 bg-blue-500 text-white px-4 py-2 rounded mb-2"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Assignment</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <Link href={`/assignments/${assignment.id}`}>
                    {assignment.title}
                  </Link>
                </td>
                <td className="px-4 py-2">{formatDate(assignment.due_date)}</td>
                <td className="px-4 py-2">{assignment.category}</td>
                <td
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentsWidget;
