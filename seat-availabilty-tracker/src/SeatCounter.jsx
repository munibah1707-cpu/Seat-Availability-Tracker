import React from "react";

const SeatCounter = ({ available, total, seconds }) => {
  return (
    <div className="mb-6">
      
      <div className="text-[44px] font-bold tracking-tight text-gray-900 leading-none">
        {available}
      </div>
      
      <div className="text-sm font-medium text-gray-500 mt-1">
        Available out of {total}
      </div>
      

      <div className="text-xs font-mono text-gray-400 mt-3">
        Session: {seconds}s
      </div>
    </div>
  );
}

export default SeatCounter;