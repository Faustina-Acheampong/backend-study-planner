"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { CirclePlay, CircleStop, Timer } from "lucide-react";

{
  /* component that is in the menu */
}
{
  /* display time */
}
{
  /* stop, start counting */
}

const TimeWidget = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

  // Start the timer function
  const startTime = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  // Stop the timer function
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current as NodeJS.Timeout | number);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  // Cleanup the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Format time as MM:SS

  const formateTime = (timeInSeconds: number): string => {
    const minutes: string = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
    const seconds: string = String(timeInSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      {/* TimeWidget */}
      <h2 className=" text-gray-900  transition my-4 text-center font-semibold font-sans">
        Timer
      </h2>

      <div className="bg-purple-100 p-4 rounded-lg flex flex-col items-center  hover:bg-purple-200 transition">
        <Timer size={40} className="my-4" />
        {/* Display Time */}
        <span className="text-2xl font-semibold text-teal-700 mb-4">
          {formateTime(time)}
        </span>
        {/* Buttons Section */}
        <div className="flex space-x-4 flex-col sm:flex-row">
          {/* Start Button */}
          <button
            onClick={startTime}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-green-800 transition"
          >
            <CirclePlay size={20} className="mr-2" />
            Start
          </button>
          {/* Stop Button */}
          <button
            onClick={stopTimer}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-red-800 transition"
          >
            <CircleStop size={20} className="mr-2" />
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeWidget;
