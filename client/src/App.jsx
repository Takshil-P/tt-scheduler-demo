import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeComponent from "./components/HomeComponent";
import Scheduler from "./pages/Scheduler";
import TableTennisScheduler from "./pages/TableTennisScheduler";
import ChessScheduler from "./pages/ChessScheduler";
import CricketScheduler from "./pages/CricketScheduler";
import Tournament from "./pages/Tournament";
import SportsHub from "./pages/SportsHub";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />
      <main className="flex-grow bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route
            path="/table-tennis-scheduler"
            element={<TableTennisScheduler />}
          />
          <Route path="/chess-scheduler" element={<ChessScheduler />} />
          <Route path="/cricket-scheduler" element={<CricketScheduler />} />
          <Route
            path="/tournament"
            element={
              <Tournament
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                isDarkMode={isDarkMode}
              />
            }
          />
          {/* <Route path="/tournament" element={<Tournament />}/> */}
          <Route path="/Sports-Hub" element={<SportsHub />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
