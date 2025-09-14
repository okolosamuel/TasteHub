document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initFormValidation();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize modal functionality
    initModal();
});

/**
 * Initialize form validation for the contact form
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        resetErrors();
        
        // Validate all fields
        let isValid = true;
        
        // Name validation
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional)
        if (phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Subject validation
        if (!subjectInput.value || subjectInput.value === '') {
            showError(subjectInput, 'Please select a subject');
            isValid = false;
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, show success modal
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show the success modal
            showModal();
            contactForm.reset();
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('blur', function() {
        if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
        } else {
            clearError(emailInput);
        }
    });
    
    // Real-time validation for phone
    phoneInput.addEventListener('blur', function() {
        if (phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number');
        } else {
            clearError(phoneInput);
        }
    });
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to validate phone format
    function isValidPhone(phone) {
        // Basic phone validation - allows various formats
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }
    
    // Helper function to show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        errorMessage.textContent = message;
    }
    
    // Helper function to clear error message
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        errorMessage.textContent = '';
    }
    
    // Helper function to reset all errors
    function resetErrors() {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            clearError(input);
        });
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const toggle = faq.querySelector('.faq-toggle i');
                toggle.className = 'fas fa-plus';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const toggle = item.querySelector('.faq-toggle i');
                toggle.className = 'fas fa-times';
            }
        });
    });
}

/**
 * Initialize modal functionality
 */
function initModal() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    // Function to show the modal
    window.showModal = function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };
    
    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking the modal button
    if (modalBtn) {
        modalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

/**
 * Handle dark mode toggle
 * This is already implemented in the main script.js file,
 * but we're adding event listeners here to ensure proper functionality
 */
function checkDarkMode() {
    // Check if dark mode is enabled in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // Apply dark mode if enabled
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-mode-toggle i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Check dark mode on page load
checkDarkMode();