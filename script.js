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
