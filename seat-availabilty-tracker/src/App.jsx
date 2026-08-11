import React, { useReducer, useState, useRef, useEffect, useCallback, useMemo } from "react";
import SeatBadge from "./SeatBadge";
import SeatCounter from "./SeatCounter";
import { useTheme } from "./ThemeContext";
import { seatsReducer, initialSeats } from "./seatsReducer";

// 1. Import your custom hooks

import useSessionTimer from "./useSessionTimer";
import useSeatStats from "./useSeatStats";

const App = () => {
  const [seats, dispatch] = useReducer(seatsReducer, initialSeats);
  const { toggleTheme } = useTheme();

  // 2. Call custom hooks
  const seconds = useSessionTimer();
  const { totalSeats, availableSeats, badgeText, badgeColor } = useSeatStats(seats);

  const seatSummary = useMemo(() => {
  const occupied = seats.filter((s) => s.isOccupied).length;
  const available = seats.filter((s) => !s.isOccupied).length;
  
  // Calculate percentage (avoid dividing by zero if seats array is empty)
  const occupancyRate = seats.length > 0 
    ? Math.round((occupied / seats.length) * 100) 
    : 0;

  return { occupied, available, occupancyRate };
}, [seats]); // 👈 What should go in the dependency array? (Think about what values it uses!)


  useEffect(() => {
    if (availableSeats === 0) {
      console.warn("ALERT: Venue is sold out!");
    }
  }, [availableSeats]);

  
  // 1. REF USE CASES INITIALIZATION

  const inputRef = useRef(null);         // Ref 1: Targets physical input element
  const toggleCountRef = useRef(0);      // Ref 2: Tracks clicks without triggering re-renders

  const [venueName, setVenueName] = useState("Main Hall Arena");
// 2. EFFECTS AND CLICK HANDLERS
  
 // Ref 1 Effect: Triggers exactly once on initial load to snap the cursor focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const handleSeatClick = useCallback((id) => {
    toggleCountRef.current++;

    // Dispatch the actual visual grid state shift
    dispatch({ type: "TOGGLE_SEAT", payload: id });
 }, []);

  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4 bg-red-200">

<input
  ref={inputRef}
  type="text"
  value={venueName}
  onChange={(e) => setVenueName(e.target.value)}
  className="px-3 py-2 rounded border border-gray-400 text-center font-bold text-gray-800"
  placeholder="Venue Name"
/>

{/* 2. Total Toggles Counter with Ref 2 */}
<p className="text-sm font-semibold text-gray-700">
  Total toggles: {toggleCountRef.current}
</p>

<p className="text-sm font-semibold text-gray-700">
  Occupancy: {seatSummary.occupancyRate}%
</p>

      <SeatCounter 
        available={availableSeats} 
        total={totalSeats} 
        seconds={seconds} 
        badgeColor={badgeColor} 
        badgeText={badgeText} 
      />
      <div className="flex flex-col gap-4 max-w-xs w-full">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Toggle Theme
        </button> 

        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: "RESET_SEATS" })}
            className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition"
          >
            Reset Seats
          </button>
          <button
            onClick={() => dispatch({ type: "OCCUPY_ALL" })}
            className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
          >
            Occupy All
          </button>
        </div>
        
        {seats.length === 0 ? (
          <p className="text-sm text-gray-500 italic text-center">No seats configured.</p>
        ) : (
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "10px",
              margin: "12px 0"
            }}
          >
            {seats.map((seat) => (
              <button
                key={seat.id} 
              onClick={() => handleSeatClick(seat.id)}
                style={{
                  padding: "12px 4px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  border: "2px solid",
                  backgroundColor: seat.isOccupied ? "#fecaca" : "#dcfce7", 
                  borderColor: seat.isOccupied ? "#ef4444" : "#22c55e",
                  color: seat.isOccupied ? "#b91c1c" : "#15803d",
                  transition: "all 0.1s ease"
                }}
              >
                {seat.seatNumber}
              </button>
            ))}
          </div>
        )}

      </div>

      {availableSeats === 0 && (
        <div 
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "#dc2626",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            fontFamily: "sans-serif"
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "800", margin: "0 0 8px 0" }}>
            🚫 VENUE SOLD OUT
          </h1>
          <p style={{ fontSize: "1.125rem", margin: 0, opacity: 0.9 }}>
            No seats available
          </p>
        </div>
      )}

    </div>
  );
};

export default App;