import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChessScheduler = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-teal-600 dark:text-teal-400 mb-6 animate-fade-in">
        Welcome to Chess Scheduler
      </h2>
      <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-2">
        Plan Your Chess Tournaments with Strategy and Precision!
      </p>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Get Ready to Checkmate Your Opponents!
      </p>
      <div className="text-center">
        <button
          onClick={() => navigate('/chess-tournament')}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition duration-200"
          disabled
        >
          Go to Chess Tournament (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default ChessScheduler;