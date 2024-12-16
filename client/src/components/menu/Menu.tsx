import React from "react";
import TimeWidget from "../time/TimeWidget";
import TasksWidget from "../tasks/TasksWidget";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="container">
      Menu
      {/*this is left menu */}
      <Link
        href="/schedule"
        className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-medium transition my-4"
      >
        schedule
      </Link>
      <Link
        href="/courses"
        className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-medium transition my-4"
      >
        courses
      </Link>
      <Link
        href="/assingments"
        className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-medium transition my-4"
      >
        Assignments
      </Link>
      {/* Shortcuts Component */}
      <TimeWidget />
      <TasksWidget />
    </div>
  );
};

export default Menu;
