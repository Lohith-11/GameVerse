import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomeSection";
import GamesSection from "./components/GamesSection";
import TicTacToe from "./games/TicTacToe";
import SnakeGame from "./games/SnakeGame";
import Login from "./components/Login";
import Stopwatch from "./games/Stopwatch";
import TimerGame from "./games/TimerGame";
import GuessTheWord from "./games/GuessTheWord";
import RockPaperScissors from "./games/RockPaperScissors";
import WhackAMole from "./games/WhackAMole";
import TypingSpeedTest from "./games/TypingSpeedTest";
import NumberGuessingGame from "./games/NumberGuessingGame";
import MemoryCardGame from "./games/MemoryCardGame";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<Login setUserLoggedIn={setUserLoggedIn} />} 
          />

          <Route path="/games" element={<GamesSection />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/snake-game" element={<SnakeGame />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/timer" element={<TimerGame />} />
          <Route path="/guess-the-word" element={<GuessTheWord />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/whack-a-mole" element={<WhackAMole />} />
          <Route path="/typing-speed-test" element={<TypingSpeedTest/>}/>
          <Route path="/number-guessing-game" element={<NumberGuessingGame/>}/>
          <Route path="/memory-card-game" element={<MemoryCardGame/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
