import { useMemo } from 'react';

/**
 * Custom hook to calculate seat capacity metrics and dynamic badge status.
 * @param {Array} seats - The current array of seat objects
 */
export function useSeatStats(seats = []){
  return useMemo(() => {
    const totalSeats = seats.length;
    
    // Checks both 'isBooked' or 'status' conventions based on your state design
    const availableSeats = seats.filter(
      (seat) => !seat.isOccupied
    ).length;

    let badgeText = 'Seats Available';
    let badgeColor = 'green';

    if (availableSeats === 0) {
      badgeText = 'Sold Out';
      badgeColor = 'red';
    } else if (availableSeats <= Math.ceil(totalSeats * 0.25)) {
      badgeText = 'Almost Full';
      badgeColor = 'orange';
    }

    return {
      totalSeats,
      availableSeats,
      badgeText,
      badgeColor,
    };
  }, [seats]);
}

export default useSeatStats;