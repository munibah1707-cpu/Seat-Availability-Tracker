import React from "react";
// 1. Import SeatBadge inside SeatCounter.jsx
import SeatBadge from "./SeatBadge";

// 2. Receive those new props (badgeText, badgeColor) alongside existing ones
const SeatCounter = ({ available, total, seconds, badgeText, badgeColor }) => {
  return (
    <div className="mb-6">
      
      {/* 3. Render <SeatBadge /> inside SeatCounter's returned JSX */}
      <div className="mb-4">
        <SeatBadge color={badgeColor} text={badgeText} />
      </div>
      
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
