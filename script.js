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

    // Validate Full Name on submit
    const fullNameInput = document.getElementById('full-name');
    if (fullNameInput && !fullNameInput.value.includes(',')) {
        errors.push("Please separate your last and first name with a comma.");
    }

    // Validate Age Input (just a demo, adjust if needed)
    const ageInput = document.getElementById('age');
    if (ageInput && (isNaN(parseInt(ageInput.value)) || ageInput.value.trim() === '')) {
        errors.push("Please enter a valid age using the arrows.");
    }

    // If there are any errors, alert the user
    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        alert("Form submitted successfully!");
        this.submit(); // Proceed to submit the form after validations pass
    }
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