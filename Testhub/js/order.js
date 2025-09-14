// Order Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the order page
    initOrderPage();
});

function initOrderPage() {
    // Load cart items from localStorage
    loadCartItems();
    
    // Initialize delivery toggle
    initDeliveryToggle();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize order submission
    initOrderSubmission();
    
    // Initialize modal functionality
    initModal();
}

// Load cart items from localStorage
function loadCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartActionsContainer = document.querySelector('.cart-actions');
    const orderSummaryContainer = document.querySelector('.order-summary');
    
    // Show/hide empty cart message
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartActionsContainer.style.display = 'none';
        orderSummaryContainer.style.display = 'none';
        return;
    } else {
        emptyCartMessage.style.display = 'none';
        cartActionsContainer.style.display = 'flex';
        orderSummaryContainer.style.display = 'block';
    }
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Add each item to the cart
    cartItems.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update order summary
    updateOrderSummary();
}

// Create cart item element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image || 'images/placeholder-food.jpg'}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-control">
                <button class="quantity-btn decrease">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase">+</button>
            </div>
            <div class="remove-item">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
    `;
    
    // Add event listeners
    const decreaseBtn = cartItem.querySelector('.decrease');
    const increaseBtn = cartItem.querySelector('.increase');
    const removeBtn = cartItem.querySelector('.remove-item');
    
    decreaseBtn.addEventListener('click', () => {
        updateItemQuantity(item.id, -1);
    });
    
    increaseBtn.addEventListener('click', () => {
        updateItemQuantity(item.id, 1);
    });
    
    removeBtn.addEventListener('click', () => {
        removeCartItem(item.id);
    });
    
    return cartItem;
}

// Update item quantity
function updateItemQuantity(itemId, change) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += change;
        
        // Remove item if quantity is 0 or less
        if (cartItems[itemIndex].quantity <= 0) {
            removeCartItem(itemId);
            return;
        }
        
        // Update localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update UI
        const quantityElement = document.querySelector(`.cart-item[data-id="${itemId}"] .quantity-value`);
        quantityElement.textContent = cartItems[itemIndex].quantity;
        
        // Update order summary
        updateOrderSummary();
    }
}

// Remove cart item
function removeCartItem(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Remove item from UI
    const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    if (itemElement) {
        itemElement.remove();
    }
    
    // Check if cart is empty
    if (cartItems.length === 0) {
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const cartActionsContainer = document.querySelector('.cart-actions');
        const orderSummaryContainer = document.querySelector('.order-summary');
        
        emptyCartMessage.style.display = 'block';
        cartActionsContainer.style.display = 'none';
        orderSummaryContainer.style.display = 'none';
    }
    
    // Update order summary
    updateOrderSummary();
}

// Clear cart
function clearCart() {
    // Clear localStorage
    localStorage.removeItem('cartItems');
    
    // Reload cart items
    loadCartItems();
}

// Update order summary
function updateOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const subtotalElement = document.querySelector('.summary-row.subtotal .summary-value');
    const taxElement = document.querySelector('.summary-row.tax .summary-value');
    const deliveryElement = document.querySelector('.summary-row.delivery .summary-value');
    const totalElement = document.querySelector('.summary-row.total .summary-value');
    
    // Calculate subtotal
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate tax (10%)
    const tax = subtotal * 0.1;
    
    // Get delivery fee
    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
    const deliveryFee = deliveryOption === 'delivery' ? 5 : 0;
    
    // Calculate total
    const total = subtotal + tax + deliveryFee;
    
    // Update UI
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    deliveryElement.textContent = `$${deliveryFee.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize delivery toggle
function initDeliveryToggle() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery-option"]');
    const deliveryAddressSection = document.querySelector('.delivery-address');
    const pickupInfoSection = document.querySelector('.pickup-info');
    
    // Set initial state
    const initialOption = document.querySelector('input[name="delivery-option"]:checked').value;
    toggleDeliveryFields(initialOption);
    
    // Add event listeners
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            toggleDeliveryFields(this.value);
            updateOrderSummary();
        });
    });
    
    function toggleDeliveryFields(option) {
        if (option === 'delivery') {
            deliveryAddressSection.style.display = 'block';
            pickupInfoSection.style.display = 'none';
        } else {
            deliveryAddressSection.style.display = 'none';
            pickupInfoSection.style.display = 'block';
        }
    }
}

// Initialize form validation
function initFormValidation() {
    const form = document.querySelector('.checkout-form');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
    
    function validateInput(input) {
        // Skip validation for non-required fields
        if (!input.hasAttribute('required')) return;
        
        const errorMessage = input.nextElementSibling;
        
        // Create error message element if it doesn't exist
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            const newErrorMessage = document.createElement('div');
            newErrorMessage.classList.add('error-message');
            newErrorMessage.style.color = 'var(--red)';
            newErrorMessage.style.fontSize = '0.8rem';
            newErrorMessage.style.marginTop = '5px';
            input.parentNode.insertBefore(newErrorMessage, input.nextSibling);
        }
        
        const errorElement = errorMessage.classList.contains('error-message') ? 
            errorMessage : input.nextElementSibling;
        
        // Validate based on input type
        if (input.value.trim() === '') {
            errorElement.textContent = 'This field is required';
            input.style.borderColor = 'var(--red)';
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            errorElement.textContent = 'Please enter a valid email address';
            input.style.borderColor = 'var(--red)';
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            errorElement.textContent = 'Please enter a valid phone number';
            input.style.borderColor = 'var(--red)';
        } else {
            errorElement.textContent = '';
            input.style.borderColor = '';
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
}

// Initialize order submission
function initOrderSubmission() {
    const form = document.querySelector('.checkout-form');
    const submitBtn = document.querySelector('.submit-order');
    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate all inputs
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                
                // Show error message
                const errorMessage = input.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.textContent = 'This field is required';
                } else {
                    const newErrorMessage = document.createElement('div');
                    newErrorMessage.classList.add('error-message');
                    newErrorMessage.style.color = 'var(--red)';
                    newErrorMessage.style.fontSize = '0.8rem';
                    newErrorMessage.style.marginTop = '5px';
                    newErrorMessage.textContent = 'This field is required';
                    input.parentNode.insertBefore(newErrorMessage, input.nextSibling);
                }
                
                input.style.borderColor = 'var(--red)';
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
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-modal');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking continue shopping button
    continueShoppingBtn.addEventListener('click', function() {
        closeModal();
        window.location.href = 'menu.html';
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
    const modal = document.querySelector('.modal');
    const orderIdElement = document.querySelector('.order-id');
    const orderTotalElement = document.querySelector('.order-total');
    const deliveryTimeElement = document.querySelector('.delivery-time');
    
    // Generate random order ID
    const orderId = generateOrderId();
    
    // Get order total
    const orderTotal = document.querySelector('.summary-row.total .summary-value').textContent;
    
    // Get delivery option
    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
    
    // Set estimated delivery/pickup time
    const deliveryTime = deliveryOption === 'delivery' ? '30-45 minutes' : '15-20 minutes';
    
    // Update modal content
    orderIdElement.textContent = orderId;
    orderTotalElement.textContent = orderTotal;
    deliveryTimeElement.textContent = deliveryTime;
    
    // Show modal
    modal.classList.add('active');
    
    // Clear cart after successful order
    clearCart();
}

// Generate random order ID
function generateOrderId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
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