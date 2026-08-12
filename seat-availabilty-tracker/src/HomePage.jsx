import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ venueName, setVenueName, seatSummary }) => {
  const inputRef = useRef(null);

  // 1. Explicit State Management for API & Region Selection
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  // Focus input on initial mount
  // Focus the input when Home loads
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

// 2. API Fetch Effect with AbortController
  useEffect(() => {
    const controller = new AbortController();

    // Async function defined inside the effect
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://apis.datos.gob.ar/georef/api/provincias",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch regions");
        }

        const data = await response.json();
        // Sort provinces alphabetically by name for a clean UI dropdown
        const sortedProvinces = data.provincias.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        
        setProvinces(sortedProvinces);
      } catch (err) {
        // Only set error if it wasn't triggered by an intentional abort
        if (err.name !== "AbortError") {
          setError("Failed to load regions. Try again.");
        }
      } finally {
        // Guaranteed cleanup of loading state
        setLoading(false);
      }
    };

    fetchProvinces();  

    // Cleanup function: cancels fetch if component unmounts before completion
    return () => {
      controller.abort();
    };
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

      {/* 3. Conditional UI rendering based on Loading / Error / Success states */}
      <div className="flex flex-col items-center gap-2 w-full">
        <label htmlFor="region-select" className="text-sm font-semibold text-gray-700">
          Select Region
        </label>

        {loading ? (
          <p className="text-sm text-gray-500 font-medium italic">Loading regions...</p>
        ) : error ? (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        ) : (
          <select
            id="region-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-center"
          >
            <option value="">-- Choose a Region --</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.nombre}>
                {province.nombre}
              </option>
            ))}
          </select>
        )}

        {/* Display selected region choice */}
        {selectedRegion && !loading && !error && (
          <p className="text-sm font-bold text-green-700 mt-1">
            Selected Region: {selectedRegion}
          </p>
        )}
      </div>

      {/* 4. Navigation Link (No <a> tag!) */}
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