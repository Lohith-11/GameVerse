import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);

  // Check for a winner or a draw
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.every((cell) => cell !== null) ? "Draw" : null;
  };

  // Handle cell click
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner !== "Draw") {
        setScores((prev) => ({
          ...prev,
          [gameWinner]: prev[gameWinner] + 1,
        }));
      }
    }
    setIsXTurn(!isXTurn);
  };

  // Restart the game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>

      {/* Scoreboard */}
      <div className="flex space-x-6 mb-6">
        <div className="text-xl font-semibold">
          <span className="text-blue-500">X:</span> {scores.X}
        </div>
        <div className="text-xl font-semibold">
          <span className="text-red-500">O:</span> {scores.O}
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 flex items-center justify-center bg-gray-800 text-2xl font-bold rounded-lg cursor-pointer hover:bg-gray-700 transition"
          >
            {cell}
          </div>
        ))}
      </div>

      {/* Winner or Turn Indicator */}
      <div className="mt-6 text-xl">
        {winner ? (
          winner === "Draw" ? (
            <p className="text-yellow-400 font-semibold">It's a Draw!</p>
          ) : (
            <p className="text-green-400 font-semibold">
              {winner} Wins the Game!
            </p>
          )
        ) : (
          <p className="text-gray-300">
            Turn: <span className="font-semibold">{isXTurn ? "X" : "O"}</span>
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={restartGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Restart
        </button>
        {!winner && (
          <button
            onClick={() => setWinner("Draw")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Declare Draw
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
