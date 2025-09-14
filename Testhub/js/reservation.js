// Reservation Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the reservation page
    initReservationPage();
});

function initReservationPage() {
    // Set minimum date to today
    setMinimumDate();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize modal functionality
    initModal();
}

// Set minimum date to today
function setMinimumDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0
        let dd = today.getDate();
        
        // Add leading zeros if needed
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        dateInput.setAttribute('min', formattedToday);
        
        // Set max date to 30 days from now
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        
        const maxYyyy = maxDate.getFullYear();
        let maxMm = maxDate.getMonth() + 1;
        let maxDd = maxDate.getDate();
        
        if (maxDd < 10) maxDd = '0' + maxDd;
        if (maxMm < 10) maxMm = '0' + maxMm;
        
        const formattedMaxDate = maxYyyy + '-' + maxMm + '-' + maxDd;
        dateInput.setAttribute('max', formattedMaxDate);
    }
}

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('reservation-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        }
    });
    
    function validateInput(input) {
        // Skip validation for non-required fields
        if (!input.hasAttribute('required')) return;
        
        // Remove existing error message if any
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate based on input type
        let errorMessage = '';
        
        if (input.value.trim() === '') {
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            errorMessage = 'Please enter a valid email address';
        } else if (input.id === 'phone' && !validatePhone(input.value)) {
            errorMessage = 'Please enter a valid phone number';
        } else if (input.id === 'date' && !validateDate(input.value)) {
            errorMessage = 'Please select a valid date';
        }
        
        // Display error message if any
        if (errorMessage) {
            const errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            errorElement.textContent = errorMessage;
            input.parentNode.appendChild(errorElement);
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\+\-\(\)]{10,15}$/;
        return re.test(phone);
    }
    
    function validateDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if date is valid and not in the past
        return selectedDate instanceof Date && !isNaN(selectedDate) && selectedDate >= today;
    }
}

// Initialize form submission
function initFormSubmission() {
    const form = document.getElementById('reservation-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required inputs
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            // Remove existing error message if any
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Check if input is empty
            if ((input.type === 'checkbox' && !input.checked) || 
                (input.type !== 'checkbox' && input.value.trim() === '')) {
                isValid = false;
                
                // Create error message
                const errorElement = document.createElement('div');
                errorElement.classList.add('error-message');
                errorElement.textContent = 'This field is required';
                
                // Add error message after input
                if (input.type === 'checkbox') {
                    input.parentNode.appendChild(errorElement);
                } else {
                    input.parentNode.appendChild(errorElement);
                }
                
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        // If form is valid, show confirmation modal
        if (isValid) {
            showConfirmationModal();
        }
    });
}

// Initialize modal functionality
function initModal() {
    const modal = document.getElementById('reservation-modal');
    const closeBtn = document.querySelector('.close-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modifyBtn = document.getElementById('modify-reservation');
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking done button
    closeModalBtn.addEventListener('click', function() {
        closeModal();
        // Redirect to home page
        window.location.href = 'index.html';
    });
    
    // Close modal and focus on form when clicking modify button
    modifyBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
    }
}

// Show confirmation modal
function showConfirmationModal() {
    const modal = document.getElementById('reservation-modal');
    const form = document.getElementById('reservation-form');
    
    // Get form values
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const date = form.querySelector('#date').value;
    const time = form.querySelector('#time').value;
    const guests = form.querySelector('#guests').value;
    
    // Format date
    const formattedDate = formatDate(date);
    
    // Format time
    const formattedTime = formatTime(time);
    
    // Format guests
    const formattedGuests = guests === 'large' ? 'More than 8' : guests + (guests === '1' ? ' Person' : ' People');
    
    // Update modal content
    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-date').textContent = formattedDate;
    document.getElementById('confirm-time').textContent = formattedTime;
    document.getElementById('confirm-guests').textContent = formattedGuests;
    
    // Show modal
    modal.classList.add('active');
}

// Format date
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
}

// Dark mode toggle functionality
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}