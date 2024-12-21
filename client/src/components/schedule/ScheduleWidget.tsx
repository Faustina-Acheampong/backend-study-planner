"use client";
import React from "react";
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const ScheduleWidget = () => {
  return (
    <div className="container">
      ScheduleWidget
      {/* component that is on the home page */}
      {/* Schedule title + show all button */}
      {/* calendar view mon-fri */}

      
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/schedule"
          className="text-xl font-bold  hover:underline cursor-pointer"
        >
          Calendar Week/ Month view
        </Link>
        <button className="px-4 py-2 bg-blue-300 text-black rounded hover:bg-blue-400">
          Show All
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4  ">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
          <div
            key={day}
            className="p-4 rounded-lg shadow text-center  bg-gray-300 hover:bg-rose-400  text-gray-900  transition my-4  font-semibold   "
          >
            <h3 className="font-semibold">{day}</h3>
           <div  className="flex justify-between  mb-4  flex-col"> 
           <button className="bg-slate-50 px-4 py-2  my-2 rounded-lg text-left"> Courses </button>
           <button className="bg-slate-50 px-4 py-2   my-2 rounded-lg text-left"> Assignment </button>
           <button className="bg-slate-50 px-4 py-2   my-2 rounded-lg text-left ">Task </button>
          
           </div>
            
          </div>
        ))}
     
    </div>
     
    </div>
  );
};

export default ScheduleWidget;
