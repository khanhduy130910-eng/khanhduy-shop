import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCK7fUA6XKXDOAdfZ8CyJld4T_9afCVRj4",
  authDomain: "mini-app-c9aa9.firebaseapp.com",
  projectId: "mini-app-c9aa9",
  storageBucket: "mini-app-c9aa9.firebasestorage.app",
  messagingSenderId: "801853355153",
  appId: "1:801853355153:web:804dfcbc2f4987c1047b30",
  measurementId: "G-FTGN6NC4LW",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;