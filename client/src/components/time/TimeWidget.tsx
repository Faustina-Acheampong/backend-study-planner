import React from "react";
import { useState, useEffect, useRef } from "react";

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
    if (!isRunning) {
      clearInterval(intervalRef.current as NodeJS.Timeout | number);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  return (
    <div>
      TimeWidget
      {/* component that is in the menu */}
      {/* display time */}
      {/* stop, start counting */}
    </div>
  );
};

export default TimeWidget;
