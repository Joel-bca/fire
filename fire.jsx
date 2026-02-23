import { useState } from "react";
// We bring in our "Kitchen" tool to send data to Firebase
import { sendAnyData } from "./service/firestore";

export default function UserForm() {
  // 1. Create state variables to remember what the user types
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  // 2. What happens when they click "Submit"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from refreshing!

    // Package the 3 pieces of data into one object
    const userData = {
      username: username,
      phone: phone,
      age: age
    };

    // Send the object to a Firestore table called "users"
    await sendAnyData("users", userData);

    alert("User data successfully saved to Firebase!");
    
    // Clear the form fields after successful submission
    setUsername("");
    setPhone("");
    setAge("");
  };

  // 3. The actual UI (with simple inline CSS so it looks neat)
  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#333' }}>User Details</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Username Input */}
        <input 
          type="text" 
          placeholder="Enter Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        {/* Phone Number Input */}
        <input 
          type="tel" 
          placeholder="Enter Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        {/* Age Input */}
        <input 
          type="number" 
          placeholder="Enter Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        {/* Submit Button */}
        <button 
          type="submit" 
          style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Submit Data
        </button>

      </form>
    </div>
  );
}