import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0); // Track milliseconds

  // Update time and milliseconds
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (milliseconds === 99) {
          setMilliseconds(0);
          setTime((prevTime) => prevTime + 1);
        } else {
          setMilliseconds((prevMilliseconds) => prevMilliseconds + 1);
        }
      }, 10); // Update every 10ms
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, milliseconds]);

  // Format time into HH:MM:SS.MS
  const formatTime = (time, milliseconds) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    const ms = String(milliseconds).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${ms}`;
  };

  // Reset the timer
  const resetTime = () => {
    setIsRunning(false);
    setTime(0);
    setMilliseconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Stopwatch</h1>

      {/* Stopwatch Circle Display */}
      <div className="relative flex items-center justify-center w-96 h-96 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-6xl font-mono text-white">
          {formatTime(time, milliseconds)}
        </div>
        <div className="absolute inset-0 border-8 border-white rounded-full animate-spin-slow"></div>
      </div>

      {/* Controls */}
      <div className="flex space-x-6 mt-8">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTime}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
