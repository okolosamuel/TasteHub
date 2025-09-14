// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the gallery page
    initGalleryPage();
});

function initGalleryPage() {
    // Initialize gallery filtering
    initGalleryFilter();
    
    // Initialize lightbox functionality
    initLightbox();

    
    // Add fade in animation style
    addFadeInAnimation();
}

// Initialize gallery filtering
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Add animation
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize lightbox functionality
function initLightbox() {
    const galleryImages = document.querySelectorAll('.view-image');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentImageIndex = 0;
    let galleryImageArray = [];
    
    // Create array of gallery images
    galleryImages.forEach((image, index) => {
        galleryImageArray.push({
            src: image.getAttribute('href'),
            title: image.closest('.gallery-item').querySelector('h3').textContent,
            description: image.closest('.gallery-item').querySelector('p').textContent
        });
        
        // Add click event to open lightbox
        image.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index);
        });
    });
    
    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    }
    
    // Update lightbox content
    function updateLightboxContent() {
        const currentImage = galleryImageArray[currentImageIndex];
        
        // Add fade out animation
        lightboxImage.style.opacity = '0';
        lightboxCaption.style.opacity = '0';
        
        // Update image and caption after fade out
        setTimeout(() => {
            lightboxImage.src = currentImage.src;
            lightboxCaption.innerHTML = `<h3>${currentImage.title}</h3><p>${currentImage.description}</p>`;
            
            // Add fade in animation
            lightboxImage.style.opacity = '1';
            lightboxCaption.style.opacity = '1';
        }, 300);
    }
    
    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImageArray.length) % galleryImageArray.length;
        updateLightboxContent();
    }
    
    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImageArray.length;
        updateLightboxContent();
    }
    
    // Event listeners
    closeLightbox.addEventListener('click', closeLightboxFunc);
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightboxFunc();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

// Add fade in animation style
function addFadeInAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
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