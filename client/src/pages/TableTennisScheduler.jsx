// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TableTennisScheduler = () => {
//   const [playerName, setPlayerName] = useState("");
//   const [players, setPlayers] = useState([]);
//   const [bracket, setBracket] = useState(null);
//   const [error, setError] = useState("");

//   // Fetch players on component mount
//   useEffect(() => {
//     fetchPlayers();
//   }, []);

//   const fetchPlayers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5050/api/players");
//       setPlayers(response.data);
//     } catch {
//       setError("Failed to fetch players. Please try again.");
//     }
//   };

//   const handleAddPlayer = async (e) => {
//     e.preventDefault();
//     if (!playerName.trim()) {
//       setError("Player name cannot be empty.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5050/api/players", {
//         name: playerName,
//       });
//       setPlayerName("");
//       setError("");
//       fetchPlayers(); // Refresh the player list
//     } catch {
//       setError("Failed to add player. Please try again.");
//     }
//   };

//   const handleStartTournament = async () => {
//     if (players.length < 2) {
//       setError("At least 2 players are required to start a tournament.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5050/api/start-tournament"
//       );
//       setBracket(response.data.bracket);
//       setError("");
//     } catch {
//       setError("Failed to start tournament. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
//         Table Tennis Scheduler
//       </h2>

//       {/* Add Player Section */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//           Add Players
//         </h3>
//         <div className="flex flex-col sm:flex-row gap-4 mb-4">
//           <input
//             type="text"
//             value={playerName}
//             onChange={(e) => setPlayerName(e.target.value)}
//             placeholder="Enter player name"
//             className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//           <button
//             onClick={handleAddPlayer}
//             className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
//           >
//             Add Player
//           </button>
//         </div>

//         {/* Display Players */}
//         {players.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {players.map((player, index) => (
//               <li key={index} className="text-gray-700">
//                 {player.name}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No players added yet.</p>
//         )}
//       </div>

//       {/* Start Tournament Section */}
//       <div className="mb-8">
//         <button
//           onClick={handleStartTournament}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Start Tournament
//         </button>
//       </div>

//       {/* Display Bracket */}
//       {bracket ? (
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//             Tournament Bracket
//           </h3>
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             {bracket.map((match, index) => (
//               <div key={index} className="mb-4">
//                 <p className="text-lg font-medium">
//                   Match {index + 1}: {match.player1} vs {match.player2}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-600">
//           Start the tournament to see the bracket.
//         </p>
//       )}

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//     </div>
//   );
// };

// export default TableTennisScheduler;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TableTennisScheduler = () => {
//   const [players, setPlayers] = useState([]);
//   const [tournament, setTournament] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPlayers();
//     fetchTournament();
//   }, []);

//   const fetchPlayers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5050/api/players");
//       setPlayers(response.data);
//     } catch {
//       setError("Failed to fetch players. Please try again.");
//     }
//   };

//   const fetchTournament = async () => {
//     try {
//       const response = await axios.get("http://localhost:5050/api/tournament");
//       setTournament(response.data);
//     } catch {
//       setError("Failed to fetch tournament data. Please try again.");
//     }
//   };

//   const handleStartTournament = async () => {
//     if (players.length < 2) {
//       setError("At least 2 players are required to start a tournament.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5050/api/start-tournament"
//       );
//       setTournament(response.data);
//       setError("");
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message ||
//         "Failed to start tournament. Please try again.";
//       setError(errorMessage);
//     }
//   };

//   const handleUpdateMatch = async (matchId, winner) => {
//     try {
//       await axios.post(`http://localhost:5050/api/matches/${matchId}/update`, {
//         winner,
//       });
//       fetchTournament();
//       setError("");
//     } catch {
//       setError("Failed to update match winner. Please try again.");
//     }
//   };

//   const handleResetTournament = async () => {
//     try {
//       await axios.post("http://localhost:5050/api/reset-tournament");
//       setTournament(null);
//       setError("");
//     } catch {
//       setError("Failed to reset tournament. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
//         Table Tennis Scheduler
//       </h2>
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">Players</h3>
//         {players.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {players.map((player, index) => (
//               <li key={index} className="text-gray-700">
//                 {player.name}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No players found.</p>
//         )}
//       </div>
//       <div className="mb-8 flex flex-col sm:flex-row gap-4">
//         {!tournament ? (
//           <button
//             onClick={handleStartTournament}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Start Tournament
//           </button>
//         ) : (
//           <button
//             onClick={handleResetTournament}
//             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
//           >
//             Reset Tournament
//           </button>
//         )}
//       </div>
//       {tournament && tournament.bracket ? (
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//             Tournament Bracket
//           </h3>
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             {tournament.bracket.map((match, index) => (
//               <div
//                 key={index}
//                 className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
//               >
//                 <p className="text-lg font-medium">
//                   Match {index + 1}: {match.player1} vs {match.player2}
//                 </p>
//                 {match.winner ? (
//                   <p className="text-green-600 font-semibold">
//                     Winner: {match.winner}
//                   </p>
//                 ) : (
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() =>
//                         handleUpdateMatch(match._id, match.player1)
//                       }
//                       className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
//                     >
//                       {match.player1} Wins
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleUpdateMatch(match._id, match.player2)
//                       }
//                       className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
//                     >
//                       {match.player2} Wins
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             {tournament.winner && (
//               <p className="text-2xl font-bold text-center text-green-600 mt-4">
//                 Tournament Winner: {tournament.winner}
//               </p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-600">
//           No tournament in progress. Start a new tournament to see the bracket.
//         </p>
//       )}
//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//     </div>
//   );
// };

// export default TableTennisScheduler;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TableTennisScheduler = () => {
//   const [players, setPlayers] = useState([]);
//   const [tournament, setTournament] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchPlayers();
//     fetchTournament();
//   }, []);

//   const fetchPlayers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5050/api/players');
//       setPlayers(response.data);
//     } catch {
//       setError('Failed to fetch players. Please try again.');
//     }
//   };

//   const fetchTournament = async () => {
//     try {
//       const response = await axios.get('http://localhost:5050/api/tournament');
//       setTournament(response.data);
//     } catch {
//       setError('Failed to fetch tournament data. Please try again.');
//     }
//   };

//   const handleStartTournament = async () => {
//     if (players.length < 2) {
//       setError('At least 2 players are required to start a tournament.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5050/api/start-tournament');
//       setTournament(response.data);
//       setError('');
//     } catch (err) {
//       console.error('Error starting tournament:', err);
//       console.error('Response data:', err.response?.data);
//       console.error('Status:', err.response?.status);
//       const errorMessage = err.response?.data?.message || 'Failed to start tournament. Please try again.';
//       setError(errorMessage);
//     }
//   };

//   const handleUpdateMatch = async (matchId, winner) => {
//     try {
//       await axios.post(`http://localhost:5050/api/matches/${matchId}/update`, { winner });
//       fetchTournament();
//       setError('');
//     } catch {
//       setError('Failed to update match winner. Please try again.');
//     }
//   };

//   const handleResetTournament = async () => {
//     try {
//       await axios.post('http://localhost:5050/api/reset-tournament');
//       setTournament(null);
//       setError('');
//     } catch {
//       setError('Failed to reset tournament. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
//         Table Tennis Scheduler
//       </h2>
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">Players</h3>
//         {players.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {players.map((player, index) => (
//               <li key={index} className="text-gray-700">{player.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No players found.</p>
//         )}
//       </div>
//       <div className="mb-8 flex flex-col sm:flex-row gap-4">
//         {!tournament ? (
//           <button
//             onClick={handleStartTournament}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Start Tournament
//           </button>
//         ) : (
//           <button
//             onClick={handleResetTournament}
//             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
//           >
//             Reset Tournament
//           </button>
//         )}
//       </div>
//       {tournament && tournament.bracket ? (
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">Tournament Bracket</h3>
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             {tournament.bracket.map((match, index) => (
//               <div key={index} className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                 <p className="text-lg font-medium">
//                   Match {index + 1}: {match.player1} vs {match.player2}
//                 </p>
//                 {match.winner ? (
//                   <p className="text-green-600 font-semibold">Winner: {match.winner}</p>
//                 ) : (
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => handleUpdateMatch(match._id, match.player1)}
//                       className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
//                     >
//                       {match.player1} Wins
//                     </button>
//                     <button
//                       onClick={() => handleUpdateMatch(match._id, match.player2)}
//                       className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
//                     >
//                       {match.player2} Wins
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             {tournament.winner && (
//               <p className="text-2xl font-bold text-center text-green-600 mt-4">
//                 Tournament Winner: {tournament.winner}
//               </p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-600">No tournament in progress. Start a new tournament to see the bracket.</p>
//       )}
//       {error && (
//         <p className="text-red-500 text-center mt-4">{error}</p>
//       )}
//     </div>
//   );
// };

// export default TableTennisScheduler;

// src/pages/TableTennisScheduler.jsx
// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import MatchCard from "../components/MatchCard";

// const TableTennisScheduler = () => {
//   const [matches, setMatches] = useState([]);
//   const [currentRound, setCurrentRound] = useState(0);
//   const [tournamentWinner, setTournamentWinner] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchMatches();
//   }, []);

//   const fetchMatches = async () => {
//     try {
//       const response = await axios.get("http://localhost:5050/api/matches");
//       setMatches(response.data);
//       const maxRound = Math.max(...response.data.map((m) => m.round), 0);
//       setCurrentRound(maxRound);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching matches:", error);
//       setError("Failed to fetch matches. Please try again.");
//     }
//   };

//   const startTournament = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5050/api/matches/schedule"
//       );
//       setMatches(response.data.matches);
//       setCurrentRound(1);
//       setTournamentWinner(null);
//       setError("");
//     } catch (error) {
//       console.error("Error starting tournament:", error);
//       setError(
//         error.response?.data?.error ||
//           "Failed to start tournament. Please try again."
//       );
//     }
//   };

//   const handleWinnerSelected = (updatedMatch) => {
//     setMatches((prev) =>
//       prev.map((m) => (m._id === updatedMatch._id ? updatedMatch : m))
//     );
//     setError("");
//   };

//   const goToNextRound = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5050/api/matches/next-round"
//       );
//       if (response.data.winner) {
//         setTournamentWinner(response.data.winner);
//         setMatches([]);
//         setCurrentRound(0);
//       } else {
//         setMatches(response.data.matches);
//         setCurrentRound((prev) => prev + 1);
//       }
//       setError("");
//     } catch (error) {
//       console.error("Error scheduling next round:", error);
//       setError(
//         error.response?.data?.error ||
//           "Failed to schedule next round. Please try again."
//       );
//     }
//   };

//   const resetTournament = async () => {
//     try {
//       await axios.delete("http://localhost:5050/api/matches/reset");
//       setMatches([]);
//       setCurrentRound(0);
//       setTournamentWinner(null);
//       setError("");
//     } catch (error) {
//       console.error("Error resetting tournament:", error);
//       setError("Failed to reset tournament. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
//         Table Tennis Scheduler
//       </h2>
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       {!matches.length && !tournamentWinner && (
//         <button
//           onClick={startTournament}
//           className="mb-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Start Tournament
//         </button>
//       )}
//       {tournamentWinner && (
//         <div className="text-center mb-4">
//           <h3 className="text-2xl font-bold text-green-600">
//             Tournament Winner: {tournamentWinner.name}
//           </h3>
//           <button
//             onClick={resetTournament}
//             className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
//           >
//             Reset Tournament
//           </button>
//         </div>
//       )}
//       {matches.length > 0 && (
//         <>
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//             Round {currentRound}
//           </h3>
//           {matches
//             .filter((m) => m.round === currentRound)
//             .map((match) => (
//               <MatchCard
//                 key={match._id}
//                 match={match}
//                 onWinnerSelected={handleWinnerSelected}
//               />
//             ))}
//           {matches
//             .filter((m) => m.round === currentRound)
//             .every((m) => m.winner || m.isGivenBye) && (
//             <button
//               onClick={goToNextRound}
//               className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Next Round
//             </button>
//           )}
//           {error && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//               <div className="bg-white p-4 rounded-lg">
//                 <p className="text-red-500">{error}</p>
//                 <button
//                   onClick={() => setError("")}
//                   className="mt-2 bg-teal-600 text-white px-4 py-2 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default TableTennisScheduler;












//we are commenting out the code below to avoid conflicts with the current implementation:-


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MatchCard from '../components/MatchCard';
// const TableTennisScheduler = () => {
//   const [matches, setMatches] = useState([]);
//   const [currentRound, setCurrentRound] = useState(0);
//   const [tournamentWinner, setTournamentWinner] = useState(null);
//   const [error, setError] = useState('');

//   const fetchMatches = async () => {
//     try {
//       const response = await axios.get('http://localhost:5050/api/matches');
//       setMatches(response.data);
//       const maxRound = Math.max(...response.data.map((match) => match.round), 0);
//       setCurrentRound(maxRound);
//     } catch (err) {
//       console.error('Error fetching matches:', err);
//       setError('Failed to fetch matches');
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//   }, []);

//   const startTournament = async () => {
//     try {
//       await axios.post('http://localhost:5050/api/matches/schedule');
//       setTournamentWinner(null);
//       setError('');
//       await fetchMatches();
//     } catch (err) {
//       console.error('Error starting tournament:', err);
//       setError('Failed to start tournament. Please try again.');
//     }
//   };

//   const handleWinnerSelected = (updatedMatch) => {
//     setMatches((prevMatches) =>
//       prevMatches.map((match) =>
//         match._id === updatedMatch._id ? updatedMatch : match
//       )
//     );
//   };

//   const advanceToNextRound = async () => {
//     try {
//       const response = await axios.post('http://localhost:5050/api/matches/next-round');
//       if (response.data.message === 'Tournament concluded') {
//         setTournamentWinner(response.data.winner);
//       }
//       setError('');
//       await fetchMatches();
//     } catch (err) {
//       console.error('Error advancing to next round:', err);
//       setError('Failed to advance to next round. Please try again.');
//     }
//   };

//   const resetTournament = async () => {
//     try {
//       await axios.delete('http://localhost:5050/api/matches/reset');
//       setMatches([]);
//       setCurrentRound(0);
//       setTournamentWinner(null);
//       setError('');
//       await fetchMatches();
//     } catch (err) {
//       console.error('Error resetting tournament:', err);
//       setError('Failed to reset tournament. Please try again.');
//     }
//   };

//   const currentRoundMatches = matches.filter((match) => match.round === currentRound);

//   // return (
//     // <div className="container mx-auto p-4">
//     //   <h1 className="text-3xl font-bold mb-6 text-center">Table Tennis Tournament Scheduler</h1>
//     //   {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//     //   {tournamentWinner ? (
//     //     <div className="text-center">
//     //       <h2 className="text-2xl font-semibold mb-4">
//     //         Tournament Winner: {tournamentWinner.name}
//     //       </h2>
//     //       <button
//     //         onClick={resetTournament}
//     //         className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
//     //       >
//     //         Reset Tournament
//     //       </button>
//     //     </div>
//     //   ) : (
//     //     <>
//     //       {matches.length === 0 ? (
//     //         <div className="text-center">
//     //           <button
//     //             onClick={startTournament}
//     //             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//     //           >
//     //             Start Tournament
//     //           </button>
//     //         </div>
//     //       ) : (
//     //         <>
//     //           <h2 className="text-2xl font-semibold mb-4 text-center">
//     //             Round {currentRound}
//     //           </h2>
//     //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     //             {currentRoundMatches.map((match) => (
//     //               <MatchCard
//     //                 key={match._id}
//     //                 match={match}
//     //                 onWinnerSelected={handleWinnerSelected}
//     //               />
//     //             ))}
//     //           </div>
//     //           {currentRoundMatches.every((match) => match.winner) && (
//     //             <div className="text-center mt-6">
//     //               <button
//     //                 onClick={advanceToNextRound}
//     //                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//     //               >
//     //                 Next Round
//     //               </button>
//     //             </div>
//     //           )}
//     //           <div className="text-center mt-4">
//     //             <button
//     //               onClick={resetTournament}
//     //               className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
//     //             >
//     //               Reset Tournament
//     //             </button>
//     //           </div>
//     //         </>
//     //       )}
//     //     </>
//     //   )}
//     // </div>
  
//   return (
//   <div className="container mx-auto p-4">
//     <h1 className="text-3xl font-bold mb-6 text-center">Table Tennis Tournament Scheduler</h1>
//     {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//     {tournamentWinner ? (
//       <div className="text-center">
//         <h2 className="text-2xl font-semibold mb-4">
//           Tournament Winner: {tournamentWinner.name}
//         </h2>
//         <button
//           onClick={resetTournament}
//           className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
//         >
//           Reset Tournament
//         </button>
//       </div>
//     ) : (
//       <>
//         {matches.length === 0 ? (
//           <div className="text-center">
//             <button
//               onClick={startTournament}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Start Tournament
//             </button>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-2xl font-semibold mb-4 text-center">
//               Round {currentRound}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {currentRoundMatches.map((match) => (
//                 <MatchCard
//                   key={match._id}
//                   match={match}
//                   onWinnerSelected={handleWinnerSelected}
//                 />
//               ))}
//             </div>
//             {currentRoundMatches.every((match) => match.winner) && (
//               <div className="text-center mt-6">
//                 <button
//                   onClick={advanceToNextRound}
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//                 >
//                   Next Round
//                 </button>
//               </div>
//             )}
//             <div className="text-center mt-4">
//               <button
//                 onClick={resetTournament}
//                 className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
//               >
//                 Reset Tournament
//               </button>
//             </div>
//           </>
//         )}
//       </>
//     )}
//   </div>
// );
// };
// export default TableTennisScheduler;








































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchCard from '../components/MatchCard';

const TableTennisScheduler = () => {
  const [matches, setMatches] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [tournamentWinner, setTournamentWinner] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5050/api/matches');
      setMatches(response.data);
      const maxRound = Math.max(...response.data.map((match) => match.round), 0);
      setCurrentRound(maxRound);
      setError('');
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Failed to fetch matches. Please try again.');
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
      await axios.post('http://localhost:5050/api/matches/schedule');
      setTournamentWinner(null);
      setError('');
      await fetchMatches();
    } catch (err) {
      console.error('Error starting tournament:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Failed to start tournament. Please try again.');
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
      const response = await axios.post('http://localhost:5050/api/matches/next-round');
      if (response.data.message === 'Tournament concluded') {
        setTournamentWinner(response.data.winner);
      }
      setError('');
      await fetchMatches();
    } catch (err) {
      console.error('Error advancing to next round:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Failed to advance to next round. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetTournament = async () => {
    setLoading(true);
    try {
      await axios.delete('http://localhost:5050/api/matches/reset');
      setMatches([]);
      setCurrentRound(0);
      setTournamentWinner(null);
      setError('');
      await fetchMatches();
    } catch (err) {
      console.error('Error resetting tournament:', err.response?.data?.error || err.message);
      setError('Failed to reset tournament. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentRoundMatches = matches.filter((match) => match.round === currentRound);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-600 dark:text-teal-400">
        Table Tennis Tournament Scheduler
      </h1>
      {error && (
        <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">{error}</p>
      )}
      {loading && (
        <p className="text-center text-gray-600 mb-4">Loading...</p>
      )}
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