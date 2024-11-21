import React, { useState, useEffect } from 'react';

const cardsData = [
  { id: 1, value: 'A', image: 'https://via.placeholder.com/100/FF6347/FFFFFF?text=A' },
  { id: 2, value: 'A', image: 'https://via.placeholder.com/100/FF6347/FFFFFF?text=A' },
  { id: 3, value: 'B', image: 'https://via.placeholder.com/100/4682B4/FFFFFF?text=B' },
  { id: 4, value: 'B', image: 'https://via.placeholder.com/100/4682B4/FFFFFF?text=B' },
  { id: 5, value: 'C', image: 'https://via.placeholder.com/100/32CD32/FFFFFF?text=C' },
  { id: 6, value: 'C', image: 'https://via.placeholder.com/100/32CD32/FFFFFF?text=C' },
  { id: 7, value: 'D', image: 'https://via.placeholder.com/100/FFD700/FFFFFF?text=D' },
  { id: 8, value: 'D', image: 'https://via.placeholder.com/100/FFD700/FFFFFF?text=D' },
];

const MemoryCardGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffledCards = shuffle([...cardsData]);
    setCards(shuffledCards);
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.includes(card.id) || matchedCards.includes(card.id)) {
      return;
    }
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card.id]);

    if (flippedCards.length === 1) {
      setMoves((prevMoves) => prevMoves + 1);

      const firstCard = cards.find((c) => c.id === flippedCards[0]);
      if (firstCard.value === card.value) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, firstCard.id, card.id]);
      }
    }

    if (flippedCards.length === 1) {
      setTimeout(() => setFlippedCards([]), 1000);
    }

    if (matchedCards.length === cards.length) {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCards(shuffle([...cardsData]));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center flex-col p-6">
      <h1 className="text-4xl text-white font-extrabold mb-4">Memory Card Game</h1>
      <div className="text-white mb-4">
        <p>Moves: {moves}</p>
        {gameOver && <p className="text-green-500">You won! 🎉</p>}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-24 h-24 bg-gray-300 rounded-lg shadow-lg flex justify-center items-center cursor-pointer"
            onClick={() => handleCardClick(card)}
          >
            {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? (
              <img src={card.image} alt={card.value} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="w-full h-full bg-blue-500 rounded-lg flex justify-center items-center text-white text-xl">
                ?
              </div>
            )}
          </div>
        ))}
      </div>

      {!gameOver && (
        <button
          onClick={restartGame}
          className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default MemoryCardGame;
