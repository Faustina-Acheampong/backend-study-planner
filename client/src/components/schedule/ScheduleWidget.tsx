"use client";
import React from "react";
import Link from 'next/link';

const ScheduleWidget = () => {
  return (
    <div className="container">
      ScheduleWidget
      {/* component that is on the home page */}
      {/* Schedule title + show all button */}
      {/* calendar view mon-fri */}
      <div className="flex justify-between items-center mb-4 ">

        <Link
          href="/schedule"
          className="text-xl font-bold hover:underline cursor-pointer"
        >
          Weekly Schedule/Calendar
        </Link>
        <button className="px-4 py-2 bg-blue-200 text-black rounded hover:bg-blue-400">
          Show All
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 ">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <div
            key={day}
            className="p-4 rounded-lg shadow text-center  bg-purple-100 hover:bg-purple-300  text-gray-900  transition my-4  font-semibold  "
          >
            <h3 className="font-semibold">{day}</h3>

            <p className="text-gray-500">Courses</p>
            <p className="text-gray-500">Assignments</p>
            <p className="text-gray-500">No tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleWidget;
