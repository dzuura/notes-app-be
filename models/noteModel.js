const db = require('../config/database');

// Fungsi untuk menambahkan catatan baru
const addNote = async (userId, title, content, tags, folder, isPinned) => {
  const noteRef = db.collection('notes').doc();
  await noteRef.set({
    user_id: userId,
    title,
    content,
    tags,
    folder,
    is_pinned: isPinned,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return noteRef.id;
};

// Fungsi untuk mendapatkan semua catatan pengguna
const getNotesByUserId = async (userId) => {
  const notesSnapshot = await db.collection('notes').where('user_id', '==', userId).get();
  return notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Fungsi untuk mendapatkan catatan berdasarkan ID
const getNoteById = async (noteId) => {
  const noteSnapshot = await db.collection('notes').doc(noteId).get();
  return noteSnapshot.exists ? { id: noteSnapshot.id, ...noteSnapshot.data() } : null;
};

// Fungsi untuk memperbarui catatan
const updateNote = async (noteId, userId, updatedData) => {
  const noteRef = db.collection('notes').doc(noteId);
  const noteSnapshot = await noteRef.get();
  if (!noteSnapshot.exists || noteSnapshot.data().user_id !== userId) {
    throw new Error('Note not found or unauthorized');
  }
  await noteRef.update({
    ...updatedData,
    updated_at: new Date(),
  });
};

// Fungsi untuk menghapus catatan
const deleteNote = async (noteId, userId) => {
  const noteRef = db.collection('notes').doc(noteId);
  const noteSnapshot = await noteRef.get();
  if (!noteSnapshot.exists || noteSnapshot.data().user_id !== userId) {
    throw new Error('Note not found or unauthorized');
  }
  await noteRef.delete();
};

module.exports = {
  addNote,
  getNotesByUserId,
  getNoteById,
  updateNote,
  deleteNote,
};