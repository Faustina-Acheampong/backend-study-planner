"use client";

{
  /* component that is on the home page */
}
{
  /* Assignments title + show all button */
}
{
  /* list view of 5 assignments */
}

import React from "react";

const AssignmentsWidget = () => {
  const showAssignment = () => {
    console.log("Show all assignments button clicked");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-4">Assignments</h2>
        <button onClick={showAssignment} className="mr-2">
          Show Al
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Course Name</th>
              <th className="px-4 py-2 text-left">Assignment</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Course 1</td>
              <td className="px-4 py-2">Assignment 3</td>
              <td className="px-4 py-2">10 september 2023</td>
              <td className="px-4 py-2">category 1</td>
              <td className="px-4 py-2 text-green-500">In progress</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Course 1</td>
              <td className="px-4 py-2">Assignment 3</td>
              <td className="px-4 py-2">2 January 2025</td>
              <td className="px-4 py-2">category 1</td>
              <td className="px-4 py-2 text-yellow-500">Pending</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Course 1</td>
              <td className="px-4 py-2">Assignment 3</td>
              <td className="px-4 py-2">09 march 2025</td>
              <td className="px-4 py-2">category 1</td>
              <td className="px-4 py-2 text-red-500">Overdue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentsWidget;
