const db = require('../config/database');

// Fungsi untuk berbagi catatan
const shareNote = async (noteId, sharedByUserId, sharedWithEmail, permissionLevel) => {
  const shareRef = db.collection('shared_notes').doc();
  await shareRef.set({
    note_id: noteId,
    shared_by_user_id: sharedByUserId,
    shared_with_email,
    permission_level: permissionLevel,
    shared_at: new Date(),
  });
  return shareRef.id;
};

// Fungsi untuk mendapatkan catatan yang dibagikan kepada pengguna
const getSharedNotes = async (email) => {
  const sharedNotesSnapshot = await db.collection('shared_notes').where('shared_with_email', '==', email).get();
  return sharedNotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Fungsi untuk mencabut akses berbagi catatan
const revokeShare = async (shareId) => {
  const shareRef = db.collection('shared_notes').doc(shareId);
  await shareRef.delete();
};

module.exports = {
  shareNote,
  getSharedNotes,
  revokeShare,
};