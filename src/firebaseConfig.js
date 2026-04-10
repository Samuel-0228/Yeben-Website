import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4CrW685MZrzDNjSFXgCQCqshqrFla4lY",
  authDomain: "yeben-8478d.firebaseapp.com",
  projectId: "yeben-8478d",
  storageBucket: "yeben-8478d.appspot.com",
  messagingSenderId: "354919525789",
  appId: "1:354919525789:web:c5a8c4833817309a539374"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);