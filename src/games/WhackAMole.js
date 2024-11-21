import React, { useState, useEffect } from 'react';

const WhackAMole = () => {
  // States
  const [molePosition, setMolePosition] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Game timer (30 seconds)
  const [isMoleVisible, setIsMoleVisible] = useState(false);

  const gridSize = 9; // Grid of 3x3
  const grid = new Array(gridSize).fill(false);

  // Function to randomly show mole
  const generateMole = () => {
    if (gameOver) return;
    const randomPosition = Math.floor(Math.random() * gridSize);
    setMolePosition(randomPosition);
    setIsMoleVisible(true);

    // Hide mole after 1 second
    setTimeout(() => {
      setIsMoleVisible(false);
    }, 1000);
  };

  // Function to handle "whack" (hit) the mole
  const handleWhack = (position) => {
    if (position === molePosition) {
      setScore(score + 1);
      setMolePosition(null);
      setIsMoleVisible(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }

    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, gameOver]);

  // Random mole generation every 1.5 seconds
  useEffect(() => {
    if (!gameOver) {
      const moleInterval = setInterval(() => {
        generateMole();
      }, 1500);

      return () => clearInterval(moleInterval);
    }
  }, [gameOver]);

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setMolePosition(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-600 p-8">
      <h2 className="text-4xl font-bold text-white mb-6">Whack-A-Mole</h2>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {grid.map((_, index) => (
          <div
            key={index}
            className={`w-20 h-20 border-2 border-black rounded-lg ${
              index === molePosition && isMoleVisible ? 'bg-brown' : 'bg-gray-200'
            } relative`}
            onClick={() => handleWhack(index)}
          >
            {index === molePosition && isMoleVisible && (
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="bg-gray-800 w-12 h-12 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Score and Timer */}
      <div className="text-white text-xl mb-4">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>

      {/* Game Over / Restart */}
      {gameOver && (
        <div className="text-center text-white mt-6">
          <h3 className="text-3xl font-bold">Game Over!</h3>
          <p className="mt-2 text-xl">Your score: {score}</p>
          <button
            onClick={restartGame}
            className="mt-4 px-6 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition duration-300"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default WhackAMole;
