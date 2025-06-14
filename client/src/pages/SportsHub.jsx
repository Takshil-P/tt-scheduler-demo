// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const SportsHub = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="container mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
//       <h2 className="text-4xl font-extrabold text-center text-teal-600 dark:text-teal-400 mb-6 animate-fade-in">
//         Welcome to Your Sports Hub
//       </h2>
//       <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-2">
//         Plan Your Tournaments with Passion and Precision!
//       </p>
//       <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
//         Dive into the Excitement of Sports Scheduling Today!
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
//           <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
//             Table Tennis Scheduler
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Schedule your table tennis matches and compete with friends!
//           </p>
//           <button
//             onClick={() => navigate('/Scheduler')}
//             className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition duration-200"
//           >
//             Get Started
//           </button>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
//           <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
//             Cricket Scheduler
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Coming Soon
//           </p>
//           <button
//             className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
//             disabled
//           >
//             Coming Soon
//           </button>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
//           <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
//             Chess Scheduler
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Coming Soon
//           </p>
//           <button
//             className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
//             disabled
//           >
//             Coming Soon
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SportsHub;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const SportsHub = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-teal-600 dark:text-teal-400 mb-6 animate-fade-in">
        Welcome to Your Sports Hub
      </h2>
      <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-2">
        Plan Your Tournaments with Passion and Precision!
      </p>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Dive into the Excitement of Sports Scheduling Today!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
            Table Tennis Scheduler
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Schedule your table tennis matches and compete with friends!
          </p>
          <button
            onClick={() => navigate('/scheduler')}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition duration-200"
          >
            Get Started
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
            Cricket Scheduler
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Organize your cricket tournaments now!
          </p>
          <button
            onClick={() => navigate('/cricket-scheduler')}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition duration-200"
          >
            Get Started
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
            Chess Scheduler
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Plan your chess tournaments with strategy!
          </p>
          <button
            onClick={() => navigate('/chess-scheduler')}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SportsHub;