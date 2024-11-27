import React, { useState, useEffect } from "react";

const TimerGame = () => {
  const [targetTime, setTargetTime] = useState(0); 
  const [currentTime, setCurrentTime] = useState(0); 
  const [milliseconds, setMilliseconds] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(""); 
  const [difference, setDifference] = useState(0);


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
      }, 10); 
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isStopped]);


  const startGame = () => {
    setTargetTime(Math.floor(Math.random() * 10) + 5); 
    setCurrentTime(0);
    setMilliseconds(0);
    setIsRunning(true);
    setIsStopped(false);
    setMessage("");
    setDifference(0);
  };


  const stopTimer = () => {
    setIsStopped(true);
    setIsRunning(false);
    const totalTimeInMs = currentTime * 100 + milliseconds;
    const targetTimeInMs = targetTime * 100;
    const diff = Math.abs(targetTimeInMs - totalTimeInMs);
    setDifference(diff);

    if (diff === 0) {
      setMessage("Correct!"); 
      setScore(score + 1);
    } else {
      setMessage(`You were off by: ${diff}ms`); 
    }
  };


  const resetGame = () => {
    setIsRunning(false);
    setIsStopped(false);
    setCurrentTime(0);
    setMilliseconds(0);
    setMessage("");
    setScore(0);
    setDifference(0);
  };


  const formatTime = (timeInSec, ms) => {
    const sec = String(timeInSec % 60).padStart(2, "0");
    const milliSec = String(ms).padStart(2, "0");
    return `${sec}.${milliSec}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-8">Timer Game</h1>


      <div className="text-6xl font-mono bg-gray-700 text-blue-400 px-12 py-6 rounded-lg shadow-lg mb-6">
        {formatTime(currentTime, milliseconds)}
      </div>


      <div className="text-2xl font-mono bg-gray-600 text-yellow-400 px-6 py-2 rounded-lg mb-6">
        Target Time: {targetTime}s
      </div>


      <div className="text-xl font-mono bg-gray-600 text-green-500 px-6 py-2 rounded-lg mb-6">
        Score: {score}
      </div>


      {message && (
        <div className="text-xl font-mono bg-gray-600 text-red-500 px-6 py-2 rounded-lg mb-6">
          {message}
        </div>
      )}

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
