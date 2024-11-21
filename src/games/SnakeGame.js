import React, { useState, useEffect } from "react";

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]); // Initial snake position
  const [food, setFood] = useState([10, 10]); // Initial food position
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 20; // Size of the grid

  // Move the snake
  const moveSnake = () => {
    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length - 1]];

    switch (direction) {
      case "UP":
        head[1] -= 1;
        break;
      case "DOWN":
        head[1] += 1;
        break;
      case "LEFT":
        head[0] -= 1;
        break;
      case "RIGHT":
        head[0] += 1;
        break;
      default:
        break;
    }

    // Add new head position
    newSnake.push(head);

    // Check for collisions
    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    // Check if snake eats food
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(generateFood());
    } else {
      // Remove the tail (snake moves forward)
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  // Check collision with walls or itself
  const checkCollision = (head) => {
    // Check wall collision
    if (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= gridSize ||
      head[1] >= gridSize
    ) {
      return true;
    }

    // Check self-collision
    for (let segment of snake) {
      if (head[0] === segment[0] && head[1] === segment[1]) {
        return true;
      }
    }

    return false;
  };

  // Generate new food position
  const generateFood = () => {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return [x, y];
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, speed);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Restart the game
  const restartGame = () => {
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection("RIGHT");
    setGameOver(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
    >
      <h1 className="text-3xl font-bold mb-4">Snake Game</h1>
      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Game Over!</h2>
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
          >
            Restart
          </button>
        </div>
      ) : (
        <div
          className="relative bg-gray-800"
          style={{
            width: `${gridSize * 20}px`,
            height: `${gridSize * 20}px`,
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              style={{
                gridColumn: segment[0] + 1,
                gridRow: segment[1] + 1,
                backgroundColor: "limegreen",
              }}
              className="w-full h-full"
            ></div>
          ))}

          {/* Food */}
          <div
            style={{
              gridColumn: food[0] + 1,
              gridRow: food[1] + 1,
              backgroundColor: "red",
            }}
            className="w-full h-full"
          ></div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
