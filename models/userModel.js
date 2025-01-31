const db = require('../config/database');

// Fungsi untuk menambahkan pengguna baru
const addUser  = async (name, email, passwordHash) => {
  const userRef = db.collection('users').doc();
  await userRef.set({
    name,
    email,
    password_hash: passwordHash,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return userRef.id;
};

// Fungsi untuk mendapatkan pengguna berdasarkan email
const getUserByEmail = async (email) => {
  const userSnapshot = await db.collection('users').where('email', '==', email).get();
  return userSnapshot.empty ? null : { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() };
};

module.exports = {
  addUser,
  getUserByEmail,
};