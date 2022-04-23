// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNj_WPSKtUYgIzwyda0q_KOmlSnbvfRh4",
  authDomain: "milestone-4d714.firebaseapp.com",
  projectId: "milestone-4d714",
  storageBucket: "milestone-4d714.appspot.com",
  messagingSenderId: "453492907884",
  appId: "1:453492907884:web:922d4166be9e8f901b9d49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const createUser = async (email, password, navigate ) => {
    try {
      //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    //   //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    //   await updateProfile(auth.currentUser, {
    //     displayName: displayName,
    //   });
      navigate("/login");
    //   toastSuccessNotify("Registered successfully!");
      console.log(userCredential);
    } catch (err) {
    //   toastErrorNotify(err.message);
      alert(err.message);
    }
  };
  
  export const signIn = async (email, password, navigate) => {
    try {
      //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    //   toastSuccessNotify("Logged in successfully!");
      console.log(userCredential);
    } catch (err) {
    //   toastErrorNotify(err.message);
      alert(err.message);
    }
  };

  export const logOut = () => {
    signOut(auth);
    // toastSuccessNotify("Logged out successfully!");
  };