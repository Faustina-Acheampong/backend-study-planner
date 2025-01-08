import React, { useState, useEffect } from "react";
import TimeWidget from "../time/TimeWidget";
import TasksWidget from "../tasks/TasksWidget";
import Link from "next/link";

const Menu = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const formattedDateTime = currentDate.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <h1 className=" text-gray-900  transition my-4 text-center text-2xl  font-bold font-sans">
        {" "}
        Menu
      </h1>
      {/*this is left menu */}
      <Link
        href="/schedule"
        className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900  transition my-4 text-center font-semibold font-sans"
      >
        schedule
      </Link>
      <Link
        href="/courses"
        className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-semibold transition my-4 text-center font-sans"
      >
        courses
      </Link>
      <Link
        href="/assignments"
        className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-semibold transition my-4 text-center font-sans"
      >
        Assignments
      </Link>
      {/* Shortcuts Component */}
      <div className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-semibold transition my-4 text-center">
        <div className="text-centerp-6 bg-purple-100 hover:bg-purple-200 rounded-xl shadow-lg  flex-row">
          <h1 className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-semibold transition my-4 text-center font-sans">
            {" "}
            Date and Time
          </h1>
          <p className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-semibold transition my-4 text-center font-sans">
            {currentDateTime}
          </p>
        </div>
      </div>
      <TimeWidget />
      <TasksWidget />
    </div>
  );
};

export default Menu;
