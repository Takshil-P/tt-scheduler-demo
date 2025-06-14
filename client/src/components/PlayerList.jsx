// src/components/PlayerList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Players</h3>
      {players.length > 0 ? (
        <ul className="list-disc list-inside mb-4">
          {players.map((player) => (
            <li key={player._id} className="text-gray-700">{player.name} {player.rank ? `(Rank: ${player.rank})` : ''}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No players found.</p>
      )}
    </div>
  );
};

export default PlayerList;