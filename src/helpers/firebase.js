import { initializeApp } from "firebase/app";
import  "firebase/database"

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
  apiKey: "AIzaSyA784ykK2ghMsc7bJ4TR2Q6gUZhZ9mf42c",
  authDomain: "blogs-1ec3e.firebaseapp.com",
  databaseURL: "https://blogs-1ec3e-default-rtdb.firebaseio.com",
  projectId: "blogs-1ec3e",
  storageBucket: "blogs-1ec3e.appspot.com",
  messagingSenderId: "55276879678",
  appId: "1:55276879678:web:f37715ec931ac89e29766f"
};

// Initialize Firebase
 const firebase = initializeApp(firebaseConfig);

// export const firebaseDB = app.database();
const auth = getAuth(firebase);

export const createUser = async (email, password, navigate, displayName) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
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

  export const userObserver = (setCurrentUser) => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        // User is signed out
        setCurrentUser(false);
      }
    });
  };

  export const signUpProvider = (navigate) => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  export default firebase