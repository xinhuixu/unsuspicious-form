document.addEventListener("DOMContentLoaded", function() {
    // Find all custom select elements on the page
    const customSelects = document.querySelectorAll(".custom-select");

    // Apply custom select styling to each
    customSelects.forEach(customSelect => {
        const selectElement = customSelect.querySelector("select");
        if (selectElement) { // Ensure selectElement exists
            createCustomSelect(customSelect, selectElement);
        }
    });
});

function createCustomSelect(wrapper, selectElement) {
    const selectStyled = document.createElement("div");
    selectStyled.className = "select-styled";
    
    // Ensure the custom select shows the first option by default
    if (selectElement.options.length > 0) {
        selectStyled.textContent = selectElement.options[selectElement.selectedIndex].textContent;
    } else {
        selectStyled.textContent = "Select an option"; // Fallback text if no options
    }
    
    wrapper.insertBefore(selectStyled, selectElement);
    
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "select-options";
    wrapper.appendChild(optionsContainer);
    
    // Populate the custom dropdown with options from the original select element
    selectElement.querySelectorAll("option").forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.textContent = option.textContent;
        optionDiv.addEventListener("click", () => {
            selectStyled.textContent = optionDiv.textContent;
            selectElement.selectedIndex = index; // Set the original select value
            optionsContainer.style.display = "none"; // Close the dropdown
        });
        optionsContainer.appendChild(optionDiv);
    });
    
    // Toggle the visibility of the options when the styled select is clicked
    selectStyled.addEventListener("click", () => {
        const isOpen = optionsContainer.style.display === "block";
        closeAllCustomSelects(); // Close all other open dropdowns
        optionsContainer.style.display = isOpen ? "none" : "block";
    });

    // Close the dropdown if clicked outside
    document.addEventListener("click", function(e) {
        if (!wrapper.contains(e.target)) {
            optionsContainer.style.display = "none";
        }
    });
}

// Helper function to close all open custom selects
function closeAllCustomSelects() {
    document.querySelectorAll(".select-options").forEach(options => {
        options.style.display = "none";
    });
}

// Form Submission
document.getElementById('bad-ux-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Simulate slow processing
    setTimeout(function () {
        alert("Submission failed. Please check your form and try again.");
    }, 3000);
});

// Validate Full Name Field
const fullNameInput = document.getElementById('full-name');
if (fullNameInput) {
    fullNameInput.addEventListener('blur', function() {
        if (!this.value.includes(',')) {
            alert("Please separate your last and first name with a comma.");
        }
    });
}

// Validate Age Input
const ageInput = document.getElementById('age');
if (ageInput) {
    ageInput.addEventListener('input', function () {
        // Forcing the user to click up/down arrows
        this.value = parseInt(this.value) || '';
    });

// Prevent any manual input for the age field
    ageInput.addEventListener('keydown', function(e) {
        e.preventDefault(); // Prevent typing numbers
    });

    // Prevent mouse wheel or touchpad scrolling from changing the number
    ageInput.addEventListener('wheel', function(e) {
        e.preventDefault();
    });

    // Also prevent scrolling using arrow keys
    ageInput.addEventListener('keyup', function(e) {
        e.preventDefault();
    });
}



// Hide Cost Tooltip
const costInput = document.getElementById('cost');
if (costInput) {
    costInput.addEventListener('input', function () {
        // Prevent user from seeing the cost value
        this.title = '';
    });
}

const misleadingSubmitBtn = document.getElementById('misleading-submit-btn');

// Check if the button exists
if (misleadingSubmitBtn) {
    misleadingSubmitBtn.addEventListener('click', function() {
        // Get the form element
        const form = document.getElementById('bad-ux-form');
        
        // Reset the form fields
        form.reset();
        
        // Delay the alert slightly to ensure the form is cleared first
        setTimeout(function() {
            alert("Form cleared! Please re-enter all your information.");
        }, 0);  // A delay of 0 milliseconds ensures the form reset happens first
    });
}
// Form incomplete warnings (every 30 seconds)
/*
setInterval(function () {
    const incomplete = [...document.querySelectorAll('input, select, textarea')].some(input => {
        // Check if it's a select with a valid selection
        if (input.tagName === 'SELECT') {
            return input.selectedIndex === 0;
        }
        return input.value.trim() === '';  // Trim spaces
    });

    if (incomplete) {
        alert("You have not completed all the required items.");
    }
}, 60000);  // 60 seconds interval
*/

    // Function to check if a field is filled
    function checkIfFilled(field, fieldName) {
        if (!field.value.trim()) {  // Use trim to remove any whitespace
            alert(`${fieldName} is required.`);
        }
    }

    // Add blur event listeners only to specific fields

    const contact = document.getElementById('contact');
    const email = document.getElementById('email');


    // Attach event listeners to each field
    contact.addEventListener('blur', function() {
        checkIfFilled(contact, 'Contact Number');
    });

    email.addEventListener('blur', function() {
        checkIfFilled(email, 'Email Address');
    });

// Get the password input and the password rules div
const passwordInput = document.getElementById('password');
const passwordRules = document.getElementById('password-rules');

// Show password rules when the user moves to the next field (on blur)
passwordInput.addEventListener('blur', function() {
    passwordRules.style.display = 'block'; // Show the password rules
});