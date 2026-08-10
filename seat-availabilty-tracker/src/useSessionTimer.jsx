import { useState, useEffect } from 'react';

/**
 * Custom hook to track active session duration in seconds.
 * Handles interval creation and cleanup automatically.
 */
export function useSessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timerId);
  }, []);

  return seconds;
}

export default useSessionTimer;