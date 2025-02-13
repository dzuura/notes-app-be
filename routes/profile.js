const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: Token missing' });

  jwt.verify(token, 'Elu9xW+TPDAk/QXhIZfkisca0jj/c30eIfrUW674nkw=', async (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden: Invalid token' });
    req.user = user;
    next();
  });
};

// Profile route
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log("Authenticated user:", req.user);

    const user = await userModel.getUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
