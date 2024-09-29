import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);

// Function to fetch registrations and display in the table
async function fetchRegistrations() {
    const registrationsRef = collection(db, 'registrations');
    const snapshot = await getDocs(registrationsRef);

    const tableBody = document.getElementById('registrationsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous data

    snapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.class}</td>
            <td>${data.year}</td>
            <td>${data.section}</td>
            <td>${data.festival}</td>
            <td>${data.status}</td>
            <td>
                ${data.status === 'Requested' ? `<button onclick="approveRegistration('${doc.id}')">Approve</button>` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to approve a registration
async function approveRegistration(registrationId) {
    const registrationRef = doc(db, 'registrations', registrationId);
    try {
        await updateDoc(registrationRef, { status: 'Approved' });
        alert('Registration approved successfully!');
        fetchRegistrations(); // Refresh the table to show updated status
    } catch (error) {
        console.error('Error updating registration status: ', error);
        alert('Failed to approve registration. Please try again.');
    }
}

// Expose the function to the global scope
window.approveRegistration = approveRegistration;

// Fetch registrations on page load
window.onload = fetchRegistrations;
