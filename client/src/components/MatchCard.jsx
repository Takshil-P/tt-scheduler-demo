// // src/components/MatchCard.jsx
// import React from 'react';
// import axios from 'axios';

// const MatchCard = ({ match, onWinnerSelected }) => {
//   const handleWin = async (winnerId) => {
//     try {
//       const response = await axios.patch(`http://localhost:5050/api/matches/${match._id}`, { winnerId });
//       onWinnerSelected(response.data.match);
//     } catch (error) {
//       console.error('Error updating match:', error);
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between">
//       <div className="text-center w-1/3">
//         <p className="font-semibold text-gray-700">{match.player1?.name || 'TBD'}</p>
//         {!match.isGivenBye && (
//           <button
//             onClick={() => handleWin(match.player1._id)}
//             disabled={match.winner}
//             className={`mt-2 px-4 py-2 rounded text-white font-medium ${
//               match.winner ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
//             }`}
//           >
//             Win
//           </button>
//         )}
//       </div>
//       <p className="text-xl font-bold text-gray-700">vs</p>
//       <div className="text-center w-1/3">
//         <p className="font-semibold text-gray-700">{match.player2?.name || 'Bye'}</p>
//         {!match.isGivenBye && match.player2 && (
//           <button
//             onClick={() => handleWin(match.player2._id)}
//             disabled={match.winner}
//             className={`mt-2 px-4 py-2 rounded text-white font-medium ${
//               match.winner ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
//             }`}
//           >
//             Win
//           </button>
//         )}
//       </div>
//       {match.isGivenBye && (
//         <p className="text-center text-gray-500 w-full mt-2">
//           Bye: {match.player1.name} advances
//         </p>
//       )}
//       {match.winner && (
//         <p className="text-center text-green-600 font-semibold w-full mt-2">
//           Winner: {match.winner.name}
//         </p>
//       )}
//     </div>
//   );
// };

// export default MatchCard;


import React from 'react';
import axios from 'axios';

const MatchCard = ({ match, onWinnerSelected }) => {
  const handleWinner = async (winnerId) => {
    if (!winnerId) {
      console.error('Winner ID is undefined');
      return;
    }
    if (!match._id) {
      console.error('Match ID is undefined');
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:5050/api/matches/${match._id}`, {
        winnerId,
      });
      onWinnerSelected(response.data.match);
    } catch (error) {
      console.error('Error updating match:', error.response?.data || error.message);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md bg-white">
      {match.isGivenBye ? (
        <p className="text-gray-500 italic">Bye: {match.player1?.name || 'TBD'} advances</p>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-700">{match.player1?.name || 'TBD'}</p>
            {match.winner && match.winner._id === match.player1?._id && (
              <p className="text-green-500 font-medium">Winner</p>
            )}
          </div>
          <p className="text-gray-500">vs</p>
          <div>
            <p className="font-semibold text-gray-700">{match.player2?.name || 'TBD'}</p>
            {match.winner && match.winner._id === match.player2?._id && (
              <p className="text-green-500 font-medium">Winner</p>
            )}
          </div>
        </div>
      )}
      {!match.isGivenBye && !match.winner && (
        <div className="mt-4 flex justify-around">
          <button
            onClick={() => handleWinner(match.player1?._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={!match.player1?._id}
          >
            Win
          </button>
          <button
            onClick={() => handleWinner(match.player2?._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={!match.player2?._id}
          >
            Win
          </button>
        </div>
      )}
      {match.winner && !match.isGivenBye && (
        <p className="mt-2 text-center text-gray-600">
          Winner: {match.winner?.name || 'TBD'}
        </p>
      )}
    </div>
  );
};

export default MatchCard;