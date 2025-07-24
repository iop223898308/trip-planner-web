import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuU-Juuxy1tUVi7UE6kMj78FDhnbSCN_o",
  authDomain: "tour-web-4438b.firebaseapp.com",
  projectId: "tour-web-4438b",
  storageBucket: "tour-web-4438b.firebasestorage.app",
  messagingSenderId: "690469658509",
  appId: "1:690469658509:web:bf876159f353140281e7c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };