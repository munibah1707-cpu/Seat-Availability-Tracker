# 🎟️ Seat Availability Tracker

A real-world React application built progressively across 15 concepts — from component state to API integration — as part of a structured Kid-to-Pro curriculum. Every feature in this app was written from scratch with no starter code.

[Live Demo](https://seat-availability-tracker-loyf.vercel.app/) · [GitHub Repo](https://github.com/munibah1707-cpu/Seat-Availability-Tracker)

---

## 🌟 What It Does

A venue seat management tool where you can:

* **View & Toggle Seats:** Interact with individual seat availability in a live, responsive grid.
* **Real-time Analytics:** Track occupancy rate and session time continuously.
* **Bulk Actions:** Reset all seats or mark all as occupied with a single click.
* **Global Theme Switching:** Toggle seamlessly between light and dark themes across the whole app.
* **Live API Data:** Browse and select a region fetched dynamically from an external government API.
* **Client-Side Routing:** Navigate smoothly between the Overview home page and the Seat Tracker page.
* **Error Resilience:** Recover gracefully from unexpected render errors without triggering full page refreshes.

---

## 📄 Pages

### `/` — Home Page
* Editable venue name input (auto-focused on load).
* Live occupancy rate display.
* Region selector populated from a real external API (*Argentine Provinces — georef API*).
* Explicitly handled loading and error UI states.
* Direct navigation link to the Seat Tracker page.

### `/seats` — Seat Tracker Page
* **4-Column Seat Grid:** Displays live occupied vs. available visual states.
* **Interactive Seats:** Click any seat to toggle its availability.
* **Action Controls:** Bulk action buttons to *Reset Seats* or *Occupy All*.
* **Session Timer:** Displays active seconds elapsed since page load.
* **Dynamic Badge:** Real-time availability badge updating based on threshold metrics.
* **Sold Out Banner:** Full-screen overlay triggered when 100% of seats are occupied.
* **Silent Ref Counter:** Total seat toggles tracked without triggering unnecessary component re-renders.

---

## 🧠 React Concepts Demonstrated

This project was built concept-by-concept. Every hook and pattern below is actively used in the codebase — nothing is imported without purpose.

| Concept | Implementation |
| :--- | :--- |
| **`useState`** | Venue name, theme, provinces, loading, and error states |
| **Props** | Clean unidirectional data flow (`App` $\rightarrow$ `SeatsPage`, `HomePage`, `SeatCounter`, `SeatBadge`) |
| **`useEffect`** | API fetching on mount, session timer interval, auto-focusing input, sold-out alert |
| **Event Handling** | Seat toggle, theme toggle, dispatch actions, region selection |
| **Conditional Rendering** | Loading/error/success states, sold-out overlay, empty seat fallback |
| **Lists & Keys** | Rendered `.map()` loops over seats array using stable `id` keys |
| **`useContext`** | Global theme state (`light`/`dark`) consumed by `SeatBadge` without prop drilling |
| **`useReducer`** | Complex seat state managed via `TOGGLE_SEAT`, `RESET_SEATS`, and `OCCUPY_ALL` actions |
| **Custom Hooks** | `useSessionTimer` (timer interval logic), `useSeatStats` (derived seat metrics) |
| **`useRef`** | Auto-focusing venue input on mount; tracking total toggles silently without re-renders |
| **`useMemo`** | Memoized calculations for `seatSummary` (occupancy rate) and derived stats |
| **`useCallback`** | Stabilized `handleSeatClick` function reference for dispatch performance |
| **React Router v6** | Multi-page SPA built with `BrowserRouter`, `Routes`, `Route`, and `Link` |
| **API Integration** | `fetch` + `async/await` + `AbortController` + explicit loading/error handling |
| **Error Boundaries** | Class component boundaries per route with custom fallback UI and reset recovery |

---

## 📁 Project Structure

```text
src/
├── App.jsx                 # Central state, routing, and shared logic
├── main.jsx                # Root entry point — BrowserRouter + ThemeProvider
│
├── HomePage.jsx            # / route — venue overview + API region selector
├── SeatsPage.jsx           # /seats route — seat grid + controls
│
├── SeatBadge.jsx           # Availability badge — consumes ThemeContext directly
├── SeatCounter.jsx         # Seat count display — renders SeatBadge internally
│
├── ThemeContext.jsx        # createContext + ThemeProvider + useTheme hook
├── ErrorBoundary.jsx       # Class component — catches render errors per route
│
├── seatsReducer.js         # Pure reducer + initialSeats (single source of truth)
├── useSessionTimer.js      # Custom hook — seconds state + interval + cleanup
└── useSeatStats.js         # Custom hook — derived seat metrics via useMemo
