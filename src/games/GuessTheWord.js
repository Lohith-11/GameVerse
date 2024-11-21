import React, { useState, useEffect } from "react";

// List of words to pick from
const words = ["REACT", "JAVASCRIPT", "HTML", "CSS", "NODEJS", "REACTJS", "MONGODB", "EXPRESS"];

const GuessTheWord = () => {
  const [word, setWord] = useState("");
  const [displayWord, setDisplayWord] = useState("");
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [attempts, setAttempts] = useState(6); // Max incorrect attempts
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // Function to pick a random word from the list
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  // Start the game by setting the word and initializing the display word
  const startNewGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setDisplayWord("_ ".repeat(newWord.length).trim());
    setIncorrectGuesses([]);
    setAttempts(6);
    setGameOver(false);
    setMessage("");
  };

  // Handle player's guess
  const handleGuess = (letter) => {
    if (gameOver || incorrectGuesses.includes(letter) || displayWord.includes(letter)) {
      return;
    }

    if (word.includes(letter)) {
      let newDisplayWord = displayWord.split(" ");
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          newDisplayWord[i] = letter;
        }
      }
      setDisplayWord(newDisplayWord.join(" "));
    } else {
      setIncorrectGuesses([...incorrectGuesses, letter]);
      setAttempts(attempts - 1);
    }
  };

  // Check for game over conditions
  useEffect(() => {
    if (attempts === 0) {
      setGameOver(true);
      setMessage("Game Over! You lost.");
    } else if (!displayWord.includes("_")) {
      setGameOver(true);
      setMessage("Congratulations! You guessed the word.");
    }
  }, [attempts, displayWord]);

  // Handle input for guess
  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      const letter = e.target.value.toUpperCase();
      if (letter && letter.match(/[A-Z]/i)) {
        handleGuess(letter);
        e.target.value = ""; // Clear the input field
      }
    }
  };

  // Restart the game
  const restartGame = () => {
    startNewGame();
  };

  return (
    <div className="flex flex-col items-center mt-8 bg-gradient-to-b from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg w-1/2 mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">Guess the Word Game</h2>

      {/* Display the word with underscores */}
      <div className="text-4xl font-mono text-white mb-6">
        {displayWord}
      </div>

      {/* Incorrect guesses */}
      <div className="text-lg text-white mb-4">
        Incorrect guesses: {incorrectGuesses.join(", ")}
      </div>

      {/* Remaining attempts */}
      <div className="text-lg text-white mb-4">
        Attempts left: {attempts}
      </div>

      {/* Message (win/loss) */}
      {gameOver && (
        <div className="mt-6 text-xl text-white">
          {message}
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-300"
            onClick={restartGame}
          >
            Restart Game
          </button>
        </div>
      )}

      {/* Input for guesses */}
      {!gameOver && (
        <div className="mt-6 text-white">
          <input
            type="text"
            className="text-xl px-4 py-2 rounded-lg bg-white text-black border border-gray-300"
            maxLength="1"
            onKeyDown={handleInputChange}
            placeholder="Guess a letter"
          />
        </div>
      )}
    </div>
  );
};

export default GuessTheWord;
