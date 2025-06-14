import React from 'react';

const Tournament = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
        Ongoing Tournaments
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          Table Tennis 2025
        </h3>
        <p className="text-gray-600">
          Join the excitement of the Table Tennis 2025 tournament!
        </p>
      </div>
    </div>
  );
};

export default Tournament;