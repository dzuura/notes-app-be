const express = require('express');
const { addNote, getNotesByUserId, getNoteById, updateNote, deleteNote } = require('../models/noteModel');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Mendapatkan semua catatan pengguna
router.get('/', verifyToken, async (req, res) => {
  try {
    const notes = await getNotesByUserId(req.user.user_id);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Membuat catatan baru
router.post('/', verifyToken, async (req, res) => {
  const { title, content, tags, folder, is_pinned } = req.body;

  try {
    const noteId = await addNote(req.user.user_id, title, content, tags, folder, is_pinned);
    res.status(201).json({ note_id: noteId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mendapatkan catatan berdasarkan ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Memperbarui catatan
router.put('/:id', verifyToken, async (req, res) => {
  try {
    await updateNote(req.params.id, req.user.user_id, req.body);
    const updatedNote = await getNoteById(req.params.id);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Menghapus catatan
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await deleteNote(req.params.id, req.user.user_id);
    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;