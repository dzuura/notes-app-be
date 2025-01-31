const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, 'Elu9xW+TPDAk/QXhIZfkisca0jj/c30eIfrUW674nkw=', (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

// Profile route
router.get('/', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.sendStatus(404);
  res.json(user);
});

module.exports = router;