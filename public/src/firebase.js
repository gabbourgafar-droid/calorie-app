import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDurum-vJU869Mpz7kVlywAgwlZJLAyrsY",
  authDomain: "calorie-app-25b08.firebaseapp.com",
  projectId: "calorie-app-25b08",
  storageBucket: "calorie-app-25b08.firebasestorage.app",
  messagingSenderId: "876393370539",
  appId: "1:876393370539:web:b6a7c14e680ada8d8a78ee",
  measurementId: "G-HXM9XWBBG4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
