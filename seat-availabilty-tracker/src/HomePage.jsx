import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ venueName, setVenueName, seatSummary }) => {
  const inputRef = useRef(null);

  // Focus the input when Home loads
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Venue Overview</h1>

      {/* 1. Venue Input */}
      <input
        ref={inputRef}
        type="text"
        value={venueName}
        onChange={(e) => setVenueName(e.target.value)}
        className="px-3 py-2 rounded border border-gray-400 text-center font-bold text-gray-800"
        placeholder="Venue Name"
      />

      {/* 2. Occupancy Rate */}
      <p className="text-lg font-semibold text-gray-700">
        Current Occupancy: <span className="text-blue-600">{seatSummary.occupancyRate}%</span>
      </p>

      {/* 3. Navigation Link (No <a> tag!) */}
      <Link
        to="/seats"
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        View Seats →
      </Link>
    </div>
  );
};

export default HomePage;