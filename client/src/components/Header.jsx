// // this is the header component before claude
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Header = ({ toggleDarkMode, isDarkMode }) => {
//   return (
//     <header className="bg-teal-600 dark:bg-teal-800 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Table Tennis Scheduler</h1>
//         <nav className="flex items-center space-x-6">
//           <ul className="flex space-x-6">
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'text-gray-200 font-medium border-b-2 border-gray-200'
//                     : 'hover:text-gray-200 font-medium'
//                 }
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/scheduler"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'text-gray-200 font-medium border-b-2 border-gray-200'
//                     : 'hover:text-gray-200 font-medium'
//                 }
//               >
//                 Scheduler
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/tournament"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'text-gray-200 font-medium border-b-2 border-gray-200'
//                     : 'hover:text-gray-200 font-medium'
//                 }
//               >
//                 Tournament
//               </NavLink>
//             </li>
//           </ul>
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full hover:bg-teal-700"
//             aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//           >
//             {isDarkMode ? '☀️' : '🌙'}
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;




import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false); // Close menu on desktop view
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-teal-600 dark:bg-teal-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Table Tennis Scheduler</h1>
        {/* Hamburger Icon (visible only on mobile) */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-teal-700 focus:outline-none z-50"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        )}
        {/* Navigation Menu */}
        <nav
          className={`z-40 ${
            isMobile
              ? `absolute top-16 left-0 w-full bg-teal-600 dark:bg-teal-800 p-4 shadow-md ${
                  isMenuOpen ? 'block' : 'hidden'
                }`
              : 'flex items-center space-x-6'
          }`}
        >
          <ul className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-6'}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-200 font-medium border-b-2 border-gray-200'
                    : 'hover:text-gray-200 font-medium'
                }
                onClick={() => isMobile && setIsMenuOpen(false)}
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
                onClick={() => isMobile && setIsMenuOpen(false)}
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
                onClick={() => isMobile && setIsMenuOpen(false)}
              >
                Tournament
              </NavLink>
            </li>
          </ul>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded hover:bg-teal-700 ${isMobile ? 'mt-4 w-full text-left' : ''}`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isMobile ? (isDarkMode ? 'Light' : 'Dark') : (isDarkMode ? '☀️' : '🌙')}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;