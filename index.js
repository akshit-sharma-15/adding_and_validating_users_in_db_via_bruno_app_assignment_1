// index.js
const express = require('express');
const bcrypt = require('bcrypt');
const connectDB = require('./db');
const User = require('./model/user');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// POST /register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
