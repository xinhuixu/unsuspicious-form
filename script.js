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
    event.preventDefault(); // Stop form submission for validation

    // Validate the form inputs and trigger alerts
    let errors = [];
    let vagueErrorAdded = false; // Flag to track if the vague error has already been added

    // Validate Full Name on submit
    const fullNameInput = document.getElementById('full-name');
    if (fullNameInput && !fullNameInput.value.includes(',')) {
        errors.push("Please separate your last and first name with a comma.");
    }

    // Generic check for all other fields (vague error message)
    const formFields = document.querySelectorAll('#bad-ux-form input, #bad-ux-form select, #bad-ux-form textarea');
    formFields.forEach(field => {
        if (field.value.trim() === '' && !errors.includes(field.name) && !vagueErrorAdded) {
            // Add vague and frustrating error message once
            errors.push("Submission failed. Please check the form again.");
            vagueErrorAdded = true; // Set the flag to true to ensure the vague error is added only once
        }
    });

    // Introduce a 3-second delay before showing the alerts or submitting the form
    setTimeout(() => {
        // If there are any errors, alert the user after 3 seconds
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            // If no errors, submit the form after 3-second delay
            alert("Form submitted successfully!");
            this.submit(); // Proceed to submit the form
        }
    }, 3000); // Delay for 3000 milliseconds (3 seconds)
});

// Disable manual input for age (keep this restriction)
const ageInput = document.getElementById('age');
if (ageInput) {
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

const familiarityInput = document.getElementById('routes-familiarity');
if (familiarityInput) {
    familiarityInput.addEventListener('keydown', function(e) {
        e.preventDefault(); // Prevent typing numbers or any other characters
    });

    // Prevent mouse wheel or touchpad scrolling from changing the number
    familiarityInput.addEventListener('wheel', function(e) {
        e.preventDefault();
    });

    // Also prevent scrolling using arrow keys
    familiarityInput.addEventListener('keyup', function(e) {
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

function updateCostDisplay(value) {
    document.getElementById("cost-value").textContent = `$${value}`; // Update the span with the slider's current value
}

// Function to validate the password
function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    // Return true if password meets all requirements
    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber;
}

// Get the password input and password rules div
const passwordInput = document.getElementById('password');
const passwordRules = document.getElementById('password-rules');

// Listen for input event on the password field
passwordInput.addEventListener('blur', function() {
    const passwordValue = passwordInput.value;

    // Check if password meets the validation criteria
    if (!validatePassword(passwordValue)) {
        // If password is invalid, show the password rules div
        passwordRules.style.display = 'block';
    } else {
        // If password is valid, hide the password rules div
        passwordRules.style.display = 'none';
    }
});