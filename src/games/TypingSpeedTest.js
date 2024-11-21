import React, { useState, useEffect } from "react";

const TypingSpeedTest = () => {
  const [textToType, setTextToType] = useState(""); // Text to type
  const [userInput, setUserInput] = useState(""); // User's input
  const [isTyping, setIsTyping] = useState(false); // Check if typing started
  const [timeLeft, setTimeLeft] = useState(60); // Timer for the typing test (in seconds)
  const [speed, setSpeed] = useState(0); // Typing speed (words per minute)
  const [accuracy, setAccuracy] = useState(100); // Typing accuracy
  const [gameStatus, setGameStatus] = useState(""); // Status message after game ends

  // List of random sentences or words
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "React is a popular JavaScript library for building user interfaces.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "The early bird catches the worm.",
    "Coding is fun and challenging at the same time.",
  ];

  // Function to generate a random sentence from sampleTexts
  const generateRandomText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setTextToType(sampleTexts[randomIndex]);
  };

  const startTest = () => {
    setTextToType("");
    setUserInput("");
    setTimeLeft(60);
    setIsTyping(true);
    setSpeed(0);
    setAccuracy(100);
    setGameStatus("");
    generateRandomText();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          endTest();
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setUserInput(input);

    if (isTyping) {
      const wordsTyped = input.trim().split(" ").length;
      setSpeed(Math.floor((wordsTyped / (60 - timeLeft)) * 60));

      const correctChars = input.split("").filter((char, index) => char === textToType[index]).length;
      const accuracyPercentage = (correctChars / input.length) * 100;
      setAccuracy(Math.round(accuracyPercentage));
    }
  };

  const endTest = () => {
    setIsTyping(false);
    setGameStatus(`Test over! Your speed: ${speed} WPM, Accuracy: ${accuracy}%`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-8">
      <h2 className="text-4xl font-bold text-white mb-6">Typing Speed Test</h2>

      <div className="text-xl font-semibold text-white mb-4 p-6 rounded-md bg-gray-800 w-full max-w-md text-center">
        {textToType || "Loading..."}
      </div>

      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="mt-4 p-3 w-full max-w-md border rounded-md"
        placeholder="Start typing..."
        disabled={!isTyping}
      />

      <div className="mt-4 text-3xl font-bold text-white">
        Time left: {timeLeft}s
      </div>

      <div className="mt-4 text-2xl font-semibold text-white">
        Speed: {speed} WPM | Accuracy: {accuracy}%
      </div>

      <div className="mt-6">
        {isTyping ? (
          <button
            onClick={endTest}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
          >
            End Test
          </button>
        ) : (
          <button
            onClick={startTest}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            Start Test
          </button>
        )}
      </div>

      {gameStatus && <div className="mt-4 text-xl font-semibold text-white">{gameStatus}</div>}
    </div>
  );
};

export default TypingSpeedTest;
