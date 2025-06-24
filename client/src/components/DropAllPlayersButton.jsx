// Frontend React component (DropAllPlayersButton.js)
import React, { useState } from 'react';
import axios from 'axios';

const DropAllPlayersButton = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isDemo = true; // 🔒 Prevent inputs for demo

  const handleDropAllPlayers = async () => {
    if (window.confirm('Are you sure you want to drop all players? This action cannot be undone.')) {
      try {
        const response = await axios.delete('https://tt-scheduler-demo-backend.onrender.com/api/players/drop-all');
        setMessage(response.data.message);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
        setMessage('');
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDropAllPlayers}
        disabled={isDemo} // 🔒 Prevent inputs for demo
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Drop All Players
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default DropAllPlayersButton;