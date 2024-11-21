import React from "react";
import { Link } from "react-router-dom";
import tictactoe from "../assets/tic-tac-toe.png";
import snakegame from "../assets/snakegame.webp";
import stopwatch from "../assets/stopwatch.webp";
import timer from "../assets/timer.jpg";
import guesstheword from "../assets/guess-the-word.png";
import rockpaperscissors from "../assets/rock-paper-scissor.png";
import whackamole from "../assets/whack-a-mole.jpg";
import typingspeedtest from "../assets/typing.png";
import guessthenumber from "../assets/guess-the-number.png";
import memorycardgame from "../assets/Memory-Card- Game.png"

const games = [
  { name: "Tic Tac Toe", path: "/tic-tac-toe", image: tictactoe },
  { name: "Stopwatch", path: "/stopwatch", image: stopwatch },
  { name: "Timer", path: "/timer", image: timer },
  { name: "Snake Game", path: "/snake-game", image: snakegame },
  { name: "Guess the Word", path: "/guess-the-word", image: guesstheword },
  { name: "Rock Paper Scissors", path: "/rock-paper-scissors", image: rockpaperscissors},
  { name: "Whack-A-Mole", path: "/whack-a-mole", image: whackamole},
  { name: "Typing Speed Test", path: "/typing-speed-test", image: typingspeedtest},
  { name: "Number Guessing Game", path: "/number-guessing-game", image: guessthenumber},
  { name: "Memory Card Game", path: "/memory-card-game", image: memorycardgame},
];

const GamesSection = () => {
    return (
      <section id="games" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.name}
                className="relative group rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105"
              >
                {/* Game Image */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-64 object-cover"
                />
                {/* Game Name Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
                </div>
                {/* Play Now Button */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={game.path}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default GamesSection;