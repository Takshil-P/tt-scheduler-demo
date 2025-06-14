// src/components/AddPlayerForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddPlayerForm = ({ onPlayerAdded }) => {
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/players', {
        name,
        rank: rank ? Number(rank) : null,
      });
      onPlayerAdded(response.data.player);
      setName('');
      setRank('');
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add Player</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
          Player Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rank" className="block text-gray-700 font-medium mb-1">
          Rank (Optional)
        </label>
        <input
          id="rank"
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        Add Player
      </button>
    </form>
  );
};

export default AddPlayerForm;