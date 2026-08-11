export const initialSeats = [
  { id: "s1", seatNumber: "A1", isOccupied: false },
  { id: "s2", seatNumber: "A2", isOccupied: true },
  { id: "s3", seatNumber: "A3", isOccupied: false },
  { id: "s4", seatNumber: "A4", isOccupied: false },
  { id: "s5", seatNumber: "B1", isOccupied: false },
  { id: "s6", seatNumber: "B2", isOccupied: true },
  { id: "s7", seatNumber: "B3", isOccupied: false },
  { id: "s8", seatNumber: "B4", isOccupied: false }, 
];

export function seatsReducer(state, action) {
    switch (action.type) {
    case "TOGGLE_SEAT":
      // We return a BRAND NEW array where one seat's isOccupied is flipped.
      // Remember: NEVER mutate state directly! Use .map() to return a copy.
      return state.map((seat) => 
        seat.id === action.payload ? { ...seat, isOccupied: !seat.isOccupied } : seat
      );

    case "RESET_SEATS":
      // How do we restore all seats back to initialSeats?
      // (Think about what we should return here!)
        return initialSeats;

    case "OCCUPY_ALL":
      // We want to return a BRAND NEW array where EVERY seat's isOccupied is true.
      return state.map((seat) => ({ ...seat, isOccupied: true }));

    default:
      // Constraint: "must always return state for unknown action types"
      return state;
  }
};