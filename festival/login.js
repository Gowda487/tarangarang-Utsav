// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd5YGnLxaxwyCanmgBUcy6tUDuDfLfwO8",
  authDomain: "auth-f5094.firebaseapp.com",
  projectId: "auth-f5094",
  storageBucket: "auth-f5094.appspot.com",
  messagingSenderId: "321348144039",
  appId: "1:321348144039:web:e94652da511872b3fd0482",
  measurementId: "G-9K93QTWKCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const signInBtn = document.getElementById('sign-in');
  signInBtn.addEventListener('click', () => {
  console.log("clicked");
  const email = document.querySelector('.input[type="email"]').value;
  const password = document.querySelector('.input[type="password"]').value;

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    console.log("loggedin");
    const user = userCredential.user;
    window.location.href = "../final/home.html";
    console.log('User signed in:', user);
})
.catch((error) => {
    console.log(error.code);
    console.error('Error signing in:', error.message);
});
});