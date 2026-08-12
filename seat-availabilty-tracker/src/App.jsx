import React, { useReducer, useState, useRef, useCallback, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { seatsReducer, initialSeats } from "./seatsReducer";
import useSessionTimer from "./useSessionTimer";
import useSeatStats from "./useSeatStats";
import HomePage from "./HomePage";
import SeatsPage from "./SeatsPage";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  // 1. Central State & Refs
  const [seats, dispatch] = useReducer(seatsReducer, initialSeats);
  const [venueName, setVenueName] = useState("Main Hall Arena");
  const toggleCountRef = useRef(0);

  // 2. Custom Hooks
  const seconds = useSessionTimer();
  const { totalSeats, availableSeats, badgeText, badgeColor } = useSeatStats(seats);

  // 3. Derived Performance Memo
  const seatSummary = useMemo(() => {
    const occupied = seats.filter((s) => s.isOccupied).length;
    const available = seats.filter((s) => !s.isOccupied).length;
    const occupancyRate = seats.length > 0 
      ? Math.round((occupied / seats.length) * 100) 
      : 0;

    return { occupied, available, occupancyRate };
  }, [seats]);

  // 4. Callback Handler
  const handleSeatClick = useCallback((id) => {
    toggleCountRef.current++;
    dispatch({ type: "TOGGLE_SEAT", payload: id });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4 bg-red-200">
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
            <HomePage
              venueName={venueName}
              setVenueName={setVenueName}
              seatSummary={seatSummary}
            />
            </ErrorBoundary>
          }
        />
        <Route
          path="/seats"
          element={
            <ErrorBoundary>
            <SeatsPage
              seats={seats}
              dispatch={dispatch}
              handleSeatClick={handleSeatClick}
              toggleCount={toggleCountRef.current}
              seconds={seconds}
              availableSeats={availableSeats}
              totalSeats={totalSeats}
              badgeText={badgeText}
              badgeColor={badgeColor}
            />
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
};

export default App;