import React, { useState } from "react";

const NumberGuessingGame = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Function to generate a random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Handle the player's guess
  const handleGuess = () => {
    if (gameOver) return; // Don't allow guesses after game over

    const guessInt = parseInt(guess);
    if (isNaN(guessInt) || guessInt < 1 || guessInt > 100) {
      setMessage("Please enter a number between 1 and 100.");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (guessInt === randomNumber) {
      setMessage(`Correct! You guessed the number in ${attempts + 1} attempts.`);
      setGameOver(true);
    } else if (guessInt < randomNumber) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }

    setGuess("");
  };

  // Restart the game
  const restartGame = () => {
    setRandomNumber(generateRandomNumber());
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-blue-200 flex justify-center items-center flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Number Guessing Game</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-xl mb-4">
          <p className="text-gray-700">Guess the number between 1 and 100:</p>
        </div>

        {/* Input for the guess */}
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="p-2 w-full border border-gray-400 rounded mb-4"
          disabled={gameOver}
        />

        {/* Submit guess button */}
        <button
          onClick={handleGuess}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition duration-300"
          disabled={gameOver}
        >
          Guess
        </button>

        {/* Message display */}
        <div className="mt-4 text-xl">
          <p className={`font-semibold ${gameOver ? "text-green-600" : "text-red-600"}`}>{message}</p>
        </div>

        {/* Attempts and Restart Button */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg">Attempts: {attempts}</p>
          {gameOver && (
            <button
              onClick={restartGame}
              className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
            >
              Restart Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberGuessingGame;
