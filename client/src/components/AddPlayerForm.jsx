import React, { useState } from 'react';
import axios from 'axios';

const AddPlayerForm = ({ onPlayerAdded }) => {
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://project-v1-2-1.onrender.com/api/players', {
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
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-teal-200 mb-4">
        Add Player
      </h3>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-100 font-medium mb-1">
          Player Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-white dark:bg-teal-900 border border-gray-300 dark:border-teal-700 rounded text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition duration-200"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rank" className="block text-gray-700 dark:text-gray-100 font-medium mb-1">
          Rank (Optional)
        </label>
        <input
          id="rank"
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full p-2 bg-white dark:bg-teal-900 border border-gray-300 dark:border-teal-700 rounded text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition duration-200"
        />
      </div>
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-300 transition duration-200"
      >
        Add Player
      </button>
    </form>
  );
};

export default AddPlayerForm;