import React, { useReducer, useState, useEffect } from "react";
import SeatBadge from "./SeatBadge";
import SeatCounter from "./SeatCounter";
import { useTheme } from "./ThemeContext";
import { seatsReducer, initialSeats } from "./seatsReducer";

const App = () => {

  const [seats, dispatch] = useReducer(seatsReducer, initialSeats);
  const [seconds, setSeconds] = useState(0);


  const totalSeats = seats.length;
  const availableSeats = seats.filter((seat) => !seat.isOccupied).length;
  const { toggleTheme } = useTheme();

  let badgeColor = "";
  let badgeText = "";

  if (availableSeats === 0) {
    badgeColor = "orange";
    badgeText = "Sold Out";
  } else if (availableSeats <= 2) {
    badgeColor = "red";
    badgeText = "Almost Full";
  } else if (availableSeats <= 5) {
    badgeColor = "yellow";
    badgeText = "Filling Up";
  } else {
    badgeColor = "green";
    badgeText = "Available";
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (availableSeats === 0) {
      console.warn("ALERT: Venue is sold out!");
    }
  }, [availableSeats]);



return (
    <div className="flex h-screen items-center justify-center flex-col gap-4 bg-red-200">
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

        {/* 2. Added Action Buttons for Reset and Occupy All */}
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
                // 3. Dispatch TOGGLE_SEAT on click
                onClick={() => dispatch({ type: "TOGGLE_SEAT", id: seat.id })}
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
