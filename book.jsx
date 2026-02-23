import { useState, useEffect } from "react";
// Import BOTH tools from your service file
import { sendAnyData, fetchAnyData } from "./service";

export default function BookingPage() {
  // 1. Form State Variables
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // 2. State Variable to hold the fetched bookings
  const [bookings, setBookings] = useState([]);

  // 3. The function to fetch and view bookings
  const loadBookings = async () => {
    // We are naming the collection "bookings" for SmartTrail
    const data = await fetchAnyData("bookings");
    setBookings(data);
  };

  // 4. Run the fetch function automatically when the page loads
  useEffect(() => {
    loadBookings();
  }, []);

  // 5. Submit new booking
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const bookingData = {
      username: username,
      phone: phone,
      from: from,
      to: to
    };

    // Send to Firestore
    await sendAnyData("bookings", bookingData);
    alert("SmartTrail Booking Confirmed!");
    
    // Clear the form fields
    setUsername("");
    setPhone("");
    setFrom("");
    setTo("");

    // INSTANTLY refresh the list on the screen so the user sees their new booking!
    loadBookings();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* --- THE BOOKING FORM --- */}
      <h2 style={{ color: '#0056b3' }}>Book Your SmartTrail Travel</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        <input 
          type="text" placeholder="Enter Username" 
          value={username} onChange={(e) => setUsername(e.target.value)} required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="tel" placeholder="Enter Phone Number" 
          value={phone} onChange={(e) => setPhone(e.target.value)} required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" placeholder="Traveling From (City)" 
          value={from} onChange={(e) => setFrom(e.target.value)} required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" placeholder="Traveling To (City)" 
          value={to} onChange={(e) => setTo(e.target.value)} required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Confirm Booking
        </button>
      </form>

      <hr />

      {/* --- VIEW BOOKINGS SECTION --- */}
      <h3 style={{ color: '#333', marginTop: '30px' }}>Current Bookings</h3>
      
      {bookings.length === 0 ? (
        <p>No bookings found yet. Be the first to book!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {bookings.map((booking, index) => (
            <div key={index} style={{ padding: '15px', backgroundColor: '#f4f4f4', borderRadius: '8px', borderLeft: '5px solid #0056b3' }}>
              <p style={{ margin: '0 0 5px 0' }}><strong>Passenger:</strong> {booking.username} ({booking.phone})</p>
              <p style={{ margin: '0' }}><strong>Route:</strong> {booking.from} ➡️ {booking.to}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}