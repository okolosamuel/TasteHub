// Menu Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category Tabs Functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuContainers = document.querySelectorAll('.menu-items-container');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all menu containers
            menuContainers.forEach(container => {
                container.style.display = 'none';
            });
            
            // Show the selected menu container
            const categoryId = this.getAttribute('data-category');
            document.getElementById(categoryId).style.display = 'block';
        });
    });
    
    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('tastehub-cart')) || [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartPreview = document.querySelector('.cart-preview');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    
    // Create cart toggle button
    const cartToggle = document.createElement('div');
    cartToggle.className = 'cart-toggle';
    cartToggle.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">${cart.length}</span>
    `;
    document.body.appendChild(cartToggle);
    
    // Toggle cart preview
    cartToggle.addEventListener('click', function() {
        cartPreview.classList.toggle('active');
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.cart-preview') && !event.target.closest('.cart-toggle') && 
            !event.target.closest('.add-to-cart') && !event.target.closest('.quantity-btn') && 
            !event.target.closest('.remove-item')) {
            cartPreview.classList.remove('active');
        }
    });
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            // Save cart to localStorage
            localStorage.setItem('tastehub-cart', JSON.stringify(cart));
            
            // Update cart UI
            updateCartUI();
            
            // Show cart preview
            cartPreview.classList.add('active');
            
            // Add animation to button
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 1000);
        });
    });
    
    // Update cart UI
    function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        document.querySelector('.cart-toggle .cart-count').textContent = totalItems;
        
        // Update cart items
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <i class="fas fa-trash remove-item" data-id="${item.id}"></i>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }
        
        // Update total amount
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to quantity buttons and remove buttons
        addQuantityButtonListeners();
    }
    
    // Add event listeners to quantity buttons and remove buttons
    function addQuantityButtonListeners() {
        // Increase quantity
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity += 1;
                    localStorage.setItem('tastehub-cart', JSON.stringify(cart));
                    updateCartUI();
                }
            });
        });
        
        // Decrease quantity
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) {
                        cart = cart.filter(cartItem => cartItem.id !== id);
                    }
                    localStorage.setItem('tastehub-cart', JSON.stringify(cart));
                    updateCartUI();
                }
            });
        });
        
        // Remove item
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('tastehub-cart', JSON.stringify(cart));
                updateCartUI();
            });
        });
    }
    
    // Initialize cart UI
    updateCartUI();
});