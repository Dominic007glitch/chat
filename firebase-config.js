import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7DgN5CZz0LHaCoOSEp90H5UCt1OcgMN8",
  authDomain: "chat-amigos-7c84e.firebaseapp.com",
  projectId: "chat-amigos-7c84e",
  storageBucket: "chat-amigos-7c84e.firebasestorage.app",
  messagingSenderId: "194902147587",
  appId: "1:194902147587:web:6d72cf3d6b07e4c041c436"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
