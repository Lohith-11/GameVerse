import React, { useState, useEffect } from "react";

const CatchTheBall = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [balls, setBalls] = useState([]);
  const [score, setScore] = useState(0); 
  const [gameOver, setGameOver] = useState(false); 
  const [fallingSpeed, setFallingSpeed] = useState(3);


  const movePlayer = (event) => {
    if (event.key === "ArrowLeft" && playerPosition > 0) {
      setPlayerPosition(playerPosition - 10);
    } else if (event.key === "ArrowRight" && playerPosition < window.innerWidth - 100) {
      setPlayerPosition(playerPosition + 10);
    }
  };


  const createBall = () => {
    const ballWidth = Math.random() * (50 - 20) + 20; 
    const ballPosition = Math.random() * (window.innerWidth - ballWidth);
    return {
      id: Date.now(),
      x: ballPosition,
      y: 0, 
      width: ballWidth,
      height: ballWidth,
    };
  };


  useEffect(() => {
    if (gameOver) return; 

    const ballInterval = setInterval(() => {
      setBalls((prevBalls) => [...prevBalls, createBall()]);
    }, 1500);


    const moveBalls = setInterval(() => {
      setBalls((prevBalls) => {
        const updatedBalls = prevBalls.map((ball) => ({
          ...ball,
          y: ball.y + fallingSpeed,
        }));

        updatedBalls.forEach((ball, index) => {

          if (ball.y + ball.height >= window.innerHeight - 50 && ball.x >= playerPosition && ball.x <= playerPosition + 100) {
            setScore((prevScore) => prevScore + 1); 
            updatedBalls.splice(index, 1); 
          }
          // Check if ball missed
          if (ball.y > window.innerHeight) {
            updatedBalls.splice(index, 1);
          }
        });

        return updatedBalls;
      });
    }, 20);

    return () => {
      clearInterval(ballInterval);
      clearInterval(moveBalls);
    };
  }, [gameOver, playerPosition, fallingSpeed]);


  const startNewGame = () => {
    setScore(0);
    setBalls([]);
    setGameOver(false);
    setFallingSpeed(3);
  };


  useEffect(() => {
    if (score < 0) {
      setGameOver(true);
    }
  }, [score]);

  return (
    <div
      className="relative bg-blue-500 h-screen flex justify-center items-center flex-col"
      onKeyDown={movePlayer}
      tabIndex="0"
    >
      <h1 className="text-white text-4xl mb-4 font-bold">Catch The Ball Game</h1>
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Balls falling */}
        {balls.map((ball) => (
          <div
            key={ball.id}
            className="absolute"
            style={{
              left: `${ball.x}px`,
              top: `${ball.y}px`,
              width: `${ball.width}px`,
              height: `${ball.height}px`,
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></div>
        ))}

        <div
          className="absolute bottom-0"
          style={{
            left: `${playerPosition}px`,
            width: "100px",
            height: "20px",
            backgroundColor: "green",
            borderRadius: "5px",
          }}
        ></div>
      </div>


      <div className="text-white text-2xl mb-4">Score: {score}</div>

 
      {gameOver && (
        <div className="text-white text-3xl mb-4">Game Over! Your Score: {score}</div>
      )}
      <button
        onClick={startNewGame}
        className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300"
      >
        {gameOver ? "Restart Game" : "Start Game"}
      </button>
    </div>
  );
};

export default CatchTheBall;
