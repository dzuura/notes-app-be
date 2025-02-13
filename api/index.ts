const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');
const noteRoutes = require('../routes/notes');
const sharingRoutes = require('../routes/sharing');
const profileRoutes = require('../routes/profile');
const { verifyToken } = require('../middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/notes', verifyToken, noteRoutes);
app.use('/sharing', verifyToken, sharingRoutes);
app.use('/profile', verifyToken, profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;