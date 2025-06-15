import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchCard from "../components/MatchCard";

const TableTennisScheduler = () => {
  const [matches, setMatches] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [tournamentWinner, setTournamentWinner] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5050/api/matches");
      setMatches(response.data);
      const maxRound = Math.max(
        ...response.data.map((match) => match.round),
        0
      );
      setCurrentRound(maxRound);
      setError("");
    } catch (err) {
      console.error("Error fetching matches:", err);
      setError("Failed to fetch matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const startTournament = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5050/api/matches/schedule");
      setTournamentWinner(null);
      setError("");
      await fetchMatches();
    } catch (err) {
      console.error(
        "Error starting tournament:",
        err.response?.data?.error || err.message
      );
      setError(
        err.response?.data?.error ||
          "Failed to start tournament. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWinnerSelected = (updatedMatch) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match._id === updatedMatch._id ? updatedMatch : match
      )
    );
  };

  const advanceToNextRound = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5050/api/matches/next-round"
      );
      if (response.data.message === "Tournament concluded") {
        setTournamentWinner(response.data.winner);
      }
      setError("");
      await fetchMatches();
    } catch (err) {
      console.error(
        "Error advancing to next round:",
        err.response?.data?.error || err.message
      );
      setError(
        err.response?.data?.error ||
          "Failed to advance to next round. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetTournament = async () => {
    setLoading(true);
    try {
      await axios.delete("http://localhost:5050/api/matches/reset");
      setMatches([]);
      setCurrentRound(0);
      setTournamentWinner(null);
      setError("");
      await fetchMatches();
    } catch (err) {
      console.error(
        "Error resetting tournament:",
        err.response?.data?.error || err.message
      );
      setError("Failed to reset tournament. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentRoundMatches = matches.filter(
    (match) => match.round === currentRound
  );

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-600 dark:text-teal-400">
        Table Tennis Tournament Scheduler
      </h1>
      {error && (
        <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">
          {error}
        </p>
      )}
      {loading && <p className="text-center text-gray-600 mb-4">Loading...</p>}
      {tournamentWinner ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Tournament Winner: {tournamentWinner.name}
          </h2>
          <button
            onClick={resetTournament}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:bg-teal-300"
            disabled={loading}
          >
            Reset Tournament
          </button>
        </div>
      ) : (
        <>
          {matches.length === 0 ? (
            <div className="text-center">
              <button
                onClick={startTournament}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading}
              >
                Start Tournament
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
                Round {currentRound}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRoundMatches.map((match) => (
                  <MatchCard
                    key={match._id}
                    match={match}
                    onWinnerSelected={handleWinnerSelected}
                  />
                ))}
              </div>
              {currentRoundMatches.every((match) => match.winner) && (
                <div className="text-center mt-6">
                  <button
                    onClick={advanceToNextRound}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300"
                    disabled={loading}
                  >
                    Next Round
                  </button>
                </div>
              )}
              <div className="text-center mt-4">
                <button
                  onClick={resetTournament}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:bg-teal-300"
                  disabled={loading}
                >
                  Reset Tournament
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TableTennisScheduler;
