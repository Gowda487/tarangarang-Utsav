// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5VmLR5PMV-UoIXxOKPt5hXw6uym-Puyc",
    authDomain: "festival-reg-41f03.firebaseapp.com",
    projectId: "festival-reg-41f03",
    storageBucket: "festival-reg-41f03.appspot.com",
    messagingSenderId: "279709434049",
    appId: "1:279709434049:web:cf22f533d4f4152b3d1440"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login form submission
const loginForm = document.getElementById('loginForm');
const loginErrorMessage = document.getElementById('login-error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the default way

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // Sign in the user
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect or perform other actions after successful login
        console.log('User signed in successfully');
        // Optionally, you can redirect to a different page
        window.location.href = '../dashboard/index.html'; // Change to your dashboard or landing page
    } catch (error) {
        // Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
        loginErrorMessage.textContent = 'Login failed: ' + errorMessage;
        loginErrorMessage.style.color = 'red';
    }
});
