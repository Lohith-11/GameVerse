import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/backgroundimage.webp";

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center text-center py-20 min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          `URL(${backgroundImage})`,  
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10">
        <h2
          className={`text-4xl md:text-6xl font-extrabold mb-6 text-white transform transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Welcome to GameVerse
        </h2>
        <p
          className={`text-lg md:text-xl text-gray-300 mb-8 transform transition-all duration-1000 delay-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Dive into the ultimate gaming experience. Play, stream, and conquer.
        </p>
        <button
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Explore Games
        </button>
      </div>
    </section>
  );
};

export default HeroSection;