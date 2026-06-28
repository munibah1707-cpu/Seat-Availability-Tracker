import React from 'react'

const SeatCounter = ({ count,seconds }) => {
  return (
      <div>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', borderRadius: '10px', border: '2px solid grey', padding: '10px 40px', margin: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>{count}</p>
        <p>Session: {seconds}s</p>
      </div>
  )
}
export default SeatCounter;
