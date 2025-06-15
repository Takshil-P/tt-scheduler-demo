import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-teal-300 mb-4">
        Players
      </h3>
      {players.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {players.map((player) => (
            <li
              key={player._id}
              className="text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded px-2 py-1 transition duration-200"
            >
              {player.name} {player.rank ? `(Rank: ${player.rank})` : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-slate-400">No players found.</p>
      )}
    </div>
  );
};

export default PlayerList;
