// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');
const noteRoutes = require('../routes/notes');
const sharingRoutes = require('../routes/sharing');
const profileRoutes = require('../routes/profile');
const authMiddleware = require('../middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/sharing', sharingRoutes);
app.use('/api/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;