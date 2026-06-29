import React, {useState} from "react";


const AdminPanel = ({onSetSeats}) => {
   const [inputValue, setInputValue] = useState("");
   const [error, setError] = useState("");

   function handleSet(){
        const num = Number(inputValue);
          if (isNaN(num) || inputValue.trim() === '') {
      setError("Please enter a valid number");
      return;
    }
     if (num < 0) {
      setError("Cannot be less than 0");
      return;
    }
  if (num > 200) {
      setError("Cannot exceed 200");
      return;
    } 
     onSetSeats(num);
    setInputValue('');
    setError('');
   };
return(
<div>
    <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => {
          setInputValue(e.target.value);
          setError("");
        }} 
      />
       <button onClick={handleSet}>Set Seats</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
</div>
);    
}

export default AdminPanel;