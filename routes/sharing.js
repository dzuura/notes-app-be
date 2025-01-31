const express = require('express');
const { shareNote, getSharedNotes, revokeShare } = require('../models/sharingModel');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Berbagi catatan
router.post('/notes/:id/share', verifyToken, async (req, res) => {
  const { shared_with_email, permission_level } = req.body;

  try {
    const shareId = await shareNote(req.params.id, req.user.user_id, shared_with_email, permission_level);
    res.status(201).json({ share_id: shareId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mendapatkan catatan yang dibagikan kepada pengguna
router.get('/shared', verifyToken, async (req, res) => {
  try {
    const sharedNotes = await getSharedNotes(req.user.email);
    res.json(sharedNotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mencabut akses berbagi catatan
router.delete('/notes/:id/share/:share_id', verifyToken, async (req, res) => {
  try {
    await revokeShare(req.params.share_id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;