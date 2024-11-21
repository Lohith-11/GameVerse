import React, { useState, useEffect } from "react";

const TimerGame = () => {
  const [targetTime, setTargetTime] = useState(0); // Target time in seconds
  const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
  const [milliseconds, setMilliseconds] = useState(0); // Track milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(""); // Message to display when player stops
  const [difference, setDifference] = useState(0);

  // Start timer
  useEffect(() => {
    let timer;
    if (isRunning && !isStopped) {
      timer = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          if (prevMilliseconds === 99) {
            setCurrentTime((prevTime) => prevTime + 1);
            return 0;
          }
          return prevMilliseconds + 1;
        });
      }, 10); // Update every 10ms
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isStopped]);

  // Handle the "Start Game" button click
  const startGame = () => {
    setTargetTime(Math.floor(Math.random() * 10) + 5); // Random target between 5 and 15 seconds
    setCurrentTime(0);
    setMilliseconds(0);
    setIsRunning(true);
    setIsStopped(false);
    setMessage("");
    setDifference(0);
  };

  // Handle the "Stop Timer" button click
  const stopTimer = () => {
    setIsStopped(true);
    setIsRunning(false);
    const totalTimeInMs = currentTime * 100 + milliseconds;
    const targetTimeInMs = targetTime * 100; // Target time in milliseconds
    const diff = Math.abs(targetTimeInMs - totalTimeInMs);
    setDifference(diff);

    if (diff === 0) {
      setMessage("Correct!"); // If the player stopped at the exact time
      setScore(score + 1); // Increment score
    } else {
      setMessage(`You were off by: ${diff}ms`); // Show difference in milliseconds
    }
  };

  // Reset the game
  const resetGame = () => {
    setIsRunning(false);
    setIsStopped(false);
    setCurrentTime(0);
    setMilliseconds(0);
    setMessage("");
    setScore(0);
    setDifference(0);
  };

  // Format time to include milliseconds
  const formatTime = (timeInSec, ms) => {
    const sec = String(timeInSec % 60).padStart(2, "0");
    const milliSec = String(ms).padStart(2, "0");
    return `${sec}.${milliSec}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-8">Timer Game</h1>

      {/* Timer Display */}
      <div className="text-6xl font-mono bg-gray-700 text-blue-400 px-12 py-6 rounded-lg shadow-lg mb-6">
        {formatTime(currentTime, milliseconds)}
      </div>

      {/* Target time display */}
      <div className="text-2xl font-mono bg-gray-600 text-yellow-400 px-6 py-2 rounded-lg mb-6">
        Target Time: {targetTime}s
      </div>

      {/* Score Display */}
      <div className="text-xl font-mono bg-gray-600 text-green-500 px-6 py-2 rounded-lg mb-6">
        Score: {score}
      </div>

      {/* Message display */}
      {message && (
        <div className="text-xl font-mono bg-gray-600 text-red-500 px-6 py-2 rounded-lg mb-6">
          {message}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex space-x-6 mt-8">
        {!isRunning ? (
          <button
            onClick={startGame}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            Start Game
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
          >
            Stop Timer
          </button>
        )}

        {isStopped && (
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default TimerGame;
