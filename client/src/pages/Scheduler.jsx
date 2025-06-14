// import React from 'react';

// const Scheduler = () => {
//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-4xl font-bold text-center text-teal-600 mb-6">
//         Welcome to Table Tennis Scheduler
//       </h2>
//       <p className="text-xl text-center text-gray-700 mb-2">
//         Plan Your Tournaments with Ease!
//       </p>
//       <p className="text-lg text-center text-gray-600 mb-8">
//         Join the Fun of Sports Scheduling Today!
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//           <h3 className="text-2xl font-semibold text-teal-600 mb-2">
//             Table Tennis Scheduler
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Schedule your table tennis matches now and compete with friends!
//           </p>
//           <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
//             Get Started
//           </button>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//           <h3 className="text-2xl font-semibold text-teal-600 mb-2">
//             Cricket Scheduler
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Coming Soon
//           </p>
//           <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
//             Coming Soon
//           </button>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//           <h3 className="text-2xl font-semibold text-teal-600 mb-2">
//             Chess Scheduler
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Coming Soon
//           </p>
//           <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
//             Coming Soon
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scheduler;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Scheduler = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-4xl font-bold text-center text-teal-600 mb-6">
//         Welcome to Table Tennis Scheduler
//       </h2>
//       <p className="text-xl text-center text-gray-700 mb-2">
//         Plan Your Tournaments with Ease!
//       </p>
//       <p className="text-lg text-center text-gray-600 mb-8">
//         Join the Fun of Sports Scheduling Today!
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//           <h3 className="text-2xl font-semibold text-teal-600 mb-2">
//             Table Tennis Scheduler
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Schedule your table tennis matches now and compete with friends!
//           </p>
//           <button
//             onClick={() => navigate('/table-tennis-scheduler')}
//             className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
//           >
//             Get Started
//           </button>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//           <h3 className="text-2xl font-semibold text-teal-600 mb-2">
//             Cricket Scheduler
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Coming Soon
//           </p>
//           <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
//             Coming Soon
//           </button>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//           <h3 className="text-2xl font-semibold text-teal-600 mb-2">
//             Chess Scheduler
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Coming Soon
//           </p>
//           <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
//             Coming Soon
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scheduler;



// src/pages/Scheduler.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/PlayerList';
import AddPlayerForm from '../components/AddPlayerForm';

const Scheduler = () => {
  const navigate = useNavigate();

  const handlePlayerAdded = () => {
    // Optional: Trigger player list refresh if needed
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-teal-600 mb-6">
        Welcome to Table Tennis Scheduler
      </h2>
      <p className="text-xl text-center text-gray-700 mb-2">
        Plan Your Tournaments with Ease!
      </p>
      <p className="text-lg text-center text-gray-600 mb-8">
        Join the Fun of Sports Scheduling Today!
      </p>
      <PlayerList />
      <AddPlayerForm onPlayerAdded={handlePlayerAdded} />
      <div className="text-center">
        <button
          onClick={() => navigate('/table-tennis-scheduler')}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Go to Tournament
        </button>
      </div>
    </div>
  );
};

export default Scheduler;