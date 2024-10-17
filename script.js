import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, addDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Add event listener to the registration form
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const selectedClass = document.getElementById('class').value;
    const year = document.getElementById('year').value;
    const section = document.getElementById('section').value;
    const festival = document.getElementById('festival').value;
    const otherFestival = document.getElementById('other-festival').value;

    // Determine festival name and status
    let festivalName = festival === 'Others' && otherFestival ? otherFestival : festival;
    let status = (festival === 'Others' && otherFestival) ? 'Requested' : 'Approved';

    // Check if the festival is already registered
    const isRegistered = await checkFestivalRegistration(festivalName);

    //  check for class duplication
    const isClassDulpcated = await checkClassDuplication(selectedClass,year,section,festivalName) 

    
    if (isRegistered) {
        alert(`The festival "${festivalName}" is already registered.`);
    } else if (isClassDuplicated) {
        alert(`The class "${selectedClass}" for selected festival is already registered.`);
    }  else {
        // Store the registration data
        await storeRegistrationData(festivalName, selectedClass, year, section, name, status);
    }
});

// function to ckeck if a class is already registerd for same festival
async function  checkClassDuplication(selectedClass,year,section,festivalName) {
    const registrationsRef = collection(db,'registrations');
    const q = query(
        registrationsRef,
        where('class','==',selectedClass),
        where('year','!=',year),
        where('section','==',section),
        where('festival','==',festivalName),
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;//return true if class is duplicated
    
}
// Function to check if a festival is already registered
async function checkFestivalRegistration(festivalName) {
    const registrationsRef = collection(db, 'registrations');
    const q = query(registrationsRef, where('festival', '==', festivalName));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if the festival is registered
}

// Function to store registration data
async function storeRegistrationData(festivalName, selectedClass, year, section, name, status) {
    try {
        const registrationsRef = collection(db, 'registrations'); // Reference to the 'registrations' collection
        await addDoc(registrationsRef, {
            name: name,
            class: selectedClass,
            year: year,
            section: section,
            festival: festivalName,
            status: status // Use the determined status
        });
        alert('Registration successful!'); // Show success message
        document.getElementById('registrationForm').reset(); // Reset the form after successful registration
    } catch (error) {
        console.error('Error storing registration data: ', error);
        alert('Registration failed. Please try again.');
    }
}

// Function to handle DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    function updateSections() {
        const classSelect = document.getElementById('class');
        const sectionSelect = document.getElementById('section');
        const selectedClass = classSelect.value;
    
        // Clear existing options
        sectionSelect.innerHTML = '<option value="" disabled selected>Select your section</option>';
    
        // Define sections based on the selected class
        let sections;
        if (selectedClass === 'BCA') {
            sections = ['A', 'B', 'C'];
        } else if (selectedClass === 'BBA') {
            sections = ['A', 'B'];
        } else {
            sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // All sections for other classes
        }
    
        // Populate the section dropdown
        sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section;
            option.textContent = `Section ${section}`;
            sectionSelect.appendChild(option);
        });
    }

    function toggleOtherFestivalField() {
        const festivalSelect = document.getElementById('festival');
        const otherFestivalField = document.getElementById('other-festival-field');
    
        if (festivalSelect.value === 'Others') {
            otherFestivalField.style.display = 'block'; // Show the input field
        } else {
            otherFestivalField.style.display = 'none'; // Hide the input field
        }
    }

    // Attach event listeners
    document.getElementById('class').addEventListener('change', updateSections);
    document.getElementById('festival').addEventListener('change', toggleOtherFestivalField);
});
