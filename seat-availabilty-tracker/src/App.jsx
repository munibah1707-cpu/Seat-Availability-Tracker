import React,{ useState } from "react";

const App =() => {
  const [count, setCount] = useState(200);

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

 return(
  <div className="flex h-screen items-center justify-center flex-col gap-4 bg-red-200">
      <span style={{ backgroundColor: badgeColor, color: 'white', padding: '10px 30px', borderRadius: '0.25rem' }}>{badgeText}</span>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', borderRadius: '10px', border: '2px solid grey', padding: '10px 40px', margin: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>{count}</p>
<div className="flex flex-col gap-4 max-w-xs">
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

  </div>
 );
};

export default App;

