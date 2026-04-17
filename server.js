const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/hospital');

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  role: String
});

const Appointment = mongoose.model('Appointment', {
  patient: String,
  doctor: String,
  date: String
});

app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.post('/login', async (req, res) => {
  const user = await User.findOne(req.body);
  res.send(user);
});

app.post('/appointment', async (req, res) => {
  const appt = new Appointment(req.body);
  await appt.save();
  res.send(appt);
});

app.get('/appointments', async (req, res) => {
  const data = await Appointment.find();
  res.send(data);
});

app.listen(5000, () => console.log('Server running on port 5000'));