// import React from "react";

// const Header = () => {
//   return (
//     <header className="bg-teal-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Table Tennis Scheduler</h1>
//         <nav>
//           <ul className="flex space-x-6">
//             <li>
//               <a href="#" className="hover:text-gray-200 font-medium">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-gray-200 font-medium">
//                 Scheduler
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-gray-200 font-medium">
//                 Tournament
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="bg-teal-600 dark:bg-teal-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Table Tennis Scheduler</h1>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-200 font-medium border-b-2 border-gray-200'
                    : 'hover:text-gray-200 font-medium'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/scheduler"
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-200 font-medium border-b-2 border-gray-200'
                    : 'hover:text-gray-200 font-medium'
                }
              >
                Scheduler
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tournament"
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-200 font-medium border-b-2 border-gray-200'
                    : 'hover:text-gray-200 font-medium'
                }
              >
                Tournament
              </NavLink>
            </li>
          </ul>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-teal-700"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
