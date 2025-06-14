import React from "react";

const HomeComponent = () => {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-blue-600 h-screen flex items-center justify-center text-white">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-bounce">
          Unleash the Champion in You!
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Schedule Your Table Tennis Tournaments with Ease and Excitement!
        </p>
        <button className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-teal-100 transition duration-300">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default HomeComponent;
