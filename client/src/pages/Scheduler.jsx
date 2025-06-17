// src/pages/Scheduler.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PlayerList from "../components/PlayerList";
import AddPlayerForm from "../components/AddPlayerForm";
import DropAllPlayersButton from "../components/DropAllPlayersButton";

const Scheduler = () => {
  const navigate = useNavigate();

  const handlePlayerAdded = () => {
    // Optional: Trigger player list refresh if needed
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-slate-800 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-teal-600 dark:text-teal-300 mb-6 animate-fade-in">
        Welcome to Table Tennis Scheduler
      </h2>
      <p className="text-xl text-center text-gray-700 dark:text-slate-200 mb-2">
        Plan Your Tournaments with Ease!
      </p>
      <p className="text-lg text-center text-gray-600 dark:text-slate-400 mb-8">
        Join the Fun of Sports Scheduling Today!
      </p>
      <PlayerList />
      <AddPlayerForm onPlayerAdded={handlePlayerAdded} />
      <div className="text-center mt-6">
        <DropAllPlayersButton />
        <button
          onClick={() => navigate("/table-tennis-scheduler")}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-400 transition duration-200"
        >
          Go to Tournament
        </button>
      </div>
    </div>
  );
};

export default Scheduler;
