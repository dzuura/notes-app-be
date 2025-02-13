const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUser, getUserByEmail } = require("../models/userModel");

const router = express.Router();

// Registrasi pengguna
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const userId = await addUser(name, email, hashedPassword);
    res.status(201).json({ user_id: userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login pengguna
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email, name: user.name, created_at: user.created_at._seconds ? new Date(user.created_at._seconds * 1000).toISOString() : null },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;