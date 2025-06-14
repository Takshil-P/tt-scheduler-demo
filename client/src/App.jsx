// import React from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomeComponent from './components/HomeComponent';
// import Home from './pages/Home';

// // Placeholder components
// // const Header = () => <header className="bg-gray-800 text-white p-4"><h1>TT Scheduler</h1></header>;
// // const Footer = () => <footer className="bg-gray-800 text-white p-4 text-center">© 2025 Table Tennis Scheduler</footer>;
// // const Home = () => <div className="container mx-auto p-6"><h2 className="text-3xl font-bold">Welcome</h2></div>;

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <HomeComponent />
//       </main>
//       <Home />
//       {/* <HomeComponent /> */}
//       <Footer />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeComponent from './components/HomeComponent';
import Scheduler from './pages/Scheduler';
import TableTennisScheduler from './pages/TableTennisScheduler';
import Tournament from './pages/Tournament';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      <main className="flex-grow bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/table-tennis-scheduler" element={<TableTennisScheduler />} />
          <Route path="/tournament" element={<Tournament />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
