import React, { useState,useEffect } from "react";
import SeatBadge from "./SeatBadge";
import SeatCounter from "./SeatCounter";
import AdminPanel from "./AdminPanel";

const App =() => {
  const [count, setCount] = useState(200);
  const [seconds, setSeconds] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  let badgeColor = "";
  let badgeText = "";


  if (count > 50){
    badgeColor = "green";
    badgeText = "Available";
  }else if(count >=11){
    badgeColor = "yellow";
    badgeText = "Filling Up";
  }else if(count >=1){
    badgeColor = "red";
    badgeText = "Almost Full";
  }else{
    badgeColor = "Orange";
    badgeText = "Sold Out";
  }

  const bookSeat = () => {
   setCount((prev) =>Math.max(0, prev -1));
  };
  const releaseSeat = () => {
    setCount((prev) => Math.min(200, prev + 1));
  };


  useEffect(() => {
  const interval = setInterval(() => {
    setSeconds((prevSeconds) => prevSeconds + 1);
  }, 1000);
  return () => {
    clearInterval(interval);
  };
}, []);

useEffect(() => {
  if(count === 0){
    console.log("ALERT: Venue is sold out!");
  }
}, [count]);


 return (
  <div className="flex h-screen items-center justify-center flex-col gap-4 bg-red-200">
    
    
    <SeatBadge text={badgeText} color={badgeColor} />
    <SeatCounter count={count} seconds={seconds} />
    
    <div className="flex flex-col gap-4 max-w-xs w-full">
      
      
      <button 
        onClick={() => setIsAdminOpen((prev) => !prev)}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-xl text-xs tracking-wide transition-all"
      >
        {isAdminOpen ? "Close Admin" : "Admin Access"}
      </button>

      {isAdminOpen && <AdminPanel onSetSeats={setCount} />}

      <button 
        onClick={bookSeat} 
        disabled={count === 0} 
        className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-pink-200/50 active:scale-95 transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:shadow-none"
      >
        Book Seat
      </button>

      <button 
        onClick={releaseSeat} 
        disabled={count === 200} 
        className="w-full bg-white hover:bg-pink-50 disabled:bg-gray-50 text-pink-600 font-medium py-3 px-6 rounded-xl border border-pink-100 shadow-md shadow-pink-100/40 active:scale-95 transition-all duration-200 ease-in-out disabled:text-gray-300 disabled:border-gray-100 disabled:shadow-none"
      >
        Release Seat
      </button>
    </div>

    {count === 0 && (
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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

