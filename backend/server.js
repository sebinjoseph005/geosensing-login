require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Single declaration at top

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');

    // TEMPORARY: Force-create test user (remove after verification)
    try {
      const testUser = new User({
        name: "DEBUG USER",
        email: "debug@test.com",
        password: "debug123"
      });
      await testUser.save();
      console.log('Test user created in collection:', mongoose.connection.collections.users ? 'exists' : 'missing');
    } catch (err) {
      console.error('Test user creation failed:', err.message);
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');
    
    // Password validation logic here
    res.send('Login successful');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});