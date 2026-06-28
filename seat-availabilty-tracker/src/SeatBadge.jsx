import React from 'react'

const SeatBadge = ({ text, color }) => {

    if(!text || text.trim()===""){
        return null;
    }
  return (
    
      <span style={{ backgroundColor: color, color: 'white', padding: '10px 30px', borderRadius: '0.25rem' }}>{text}</span>
  )
}

export default SeatBadge;
