import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState([]);

  const register = async () => {
    await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: 'patient' })
    });
    alert('Registered');
  };

  const bookAppointment = async () => {
    await fetch('http://localhost:5000/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient: name,
        doctor: 'Dr. Smith',
        date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    });
    alert('Appointment Booked');
  };

  const loadAppointments = async () => {
    const res = await fetch('http://localhost:5000/appointments');
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Hospital Management</h1>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

      <br /><br />
      <button onClick={register}>Register</button>

      <br /><br />
      <button onClick={bookAppointment}>Book Appointment</button>

      <h2>Appointments</h2>
      {appointments.map((a, i) => (
        <div key={i}>
          {a.patient} - {a.doctor} - {a.date}
        </div>
      ))}
    </div>
  );
}

export default App;