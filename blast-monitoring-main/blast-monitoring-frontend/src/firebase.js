import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


// 🔥 Firebase Configuration (Replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDP59d-HzXEMF0kYtpi5YcvMDse3DK2uwU",
  authDomain: "blast-monitoring.firebaseapp.com",
  projectId: "blast-monitoring",
  storageBucket: "blast-monitoring.appspot.com",
  messagingSenderId: "1066754676104",
  appId: "1:1066754676104:web:a9e6aa111031d7f6f6d63d",
  databaseURL: "https://blast-monitoring-default-rtdb.firebaseio.com",

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" }); // ✅ Forces account selection popup

// ✅ Google Sign-In Function (For Main Login Page)
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Google Sign-In Error:", error.message);
        return null;
    }
};

// ✅ Allowed domains for Data Entry Login
const allowedDomains = ["blast-jayanta.ac.in", "blast-khadia.ac.in", "blast-beena.ac.in"];

// ✅ Sign-Up Function (Restricts Email to Allowed Domains)
const registerUser = async (email, password) => {
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
        alert("Only authorized mine emails are allowed!");
        return null;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error in Sign-Up:", error.message);
        return null;
    }
};

// ✅ Email/Password Login Function for Data Entry Users
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Login Failed:", error.message);
        return null;
    }
};

export { db, auth, signInWithGoogle, registerUser, loginUser };
