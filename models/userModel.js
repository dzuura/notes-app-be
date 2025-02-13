const db = require("../config/database");

// Fungsi untuk menambahkan pengguna baru
const addUser = async (name, email, passwordHash) => {
  const userRef = db.collection("users").doc();
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
  console.log("Searching for user with email:", email);
  const userSnapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (userSnapshot.empty) {
    console.log("User not found in Firestore.");
    return null;
  }

  const userDoc = userSnapshot.docs[0];
  console.log("User found:", userDoc.data());

  return { id: userDoc.id, ...userDoc.data() };
};

module.exports = {
  addUser,
  getUserByEmail,
};
