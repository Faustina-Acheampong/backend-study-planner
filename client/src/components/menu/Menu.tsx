import React from "react";
import TimeWidget from "../time/TimeWidget";
import TasksWidget from "../tasks/TasksWidget";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="container">
     <h1 className=" text-gray-900  transition my-4 text-center text-2xl  font-bold font-sans"> Menu</h1>
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
        href="/assingments"
        className="w-full py-2 px-4 block bg-purple-100 hover:bg-purple-200 rounded-lg text-gray-900 font-semibold transition my-4 text-center font-sans"
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
