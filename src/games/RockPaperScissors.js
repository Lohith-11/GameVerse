import React, { useState } from 'react';

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      return "It's a draw!";
    }
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    }
    return 'Computer wins!';
  };

  const handlePlayerChoice = (choice) => {
    const compChoice = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(determineWinner(choice, compChoice));
  };

  const restartGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-8">
      <h2 className="text-4xl font-bold text-white mb-6">Rock Paper Scissors</h2>
      
      <div className="mb-4">
        <button
          className="text-xl bg-blue-500 text-white py-2 px-4 mx-2 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => handlePlayerChoice('rock')}
        >
          Rock
        </button>
        <button
          className="text-xl bg-green-500 text-white py-2 px-4 mx-2 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => handlePlayerChoice('paper')}
        >
          Paper
        </button>
        <button
          className="text-xl bg-yellow-500 text-white py-2 px-4 mx-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          onClick={() => handlePlayerChoice('scissors')}
        >
          Scissors
        </button>
      </div>

      {playerChoice && computerChoice && (
        <div className="text-2xl font-semibold text-white mb-4">
          <p>You chose: <span className="text-xl text-blue-200">{playerChoice}</span></p>
          <p>Computer chose: <span className="text-xl text-blue-200">{computerChoice}</span></p>
        </div>
      )}


      {result && <p className="text-2xl text-white mb-4">{result}</p>}

      {(playerChoice || computerChoice) && (
        <button
          onClick={restartGame}
          className="mt-6 bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition duration-300"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default RockPaperScissors;
