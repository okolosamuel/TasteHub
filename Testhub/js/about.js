document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize animations
    initAnimations();
});

/**
 * Initialize the testimonial slider functionality
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    let currentSlide = 0;
    
    // Create dots based on number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set first slide as active
    slides[0].classList.add('active');
    
    // Previous button click handler
    prevButton.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        goToSlide(currentSlide);
    });
    
    // Next button click handler
    nextButton.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        goToSlide(currentSlide);
    });
    
    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        
        // Show the selected slide
        slides[slideIndex].classList.add('active');
        currentSlide = slideIndex;
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        goToSlide(currentSlide);
    }, 5000);
}

/**
 * Initialize scroll animations for page elements
 */
function initAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.story-section, .philosophy-item, .team-member, .timeline-item'
        );
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation classes
    const storySection = document.querySelector('.story-section');
    if (storySection) {
        storySection.classList.add('fade-in');
    }
    
    const philosophyItems = document.querySelectorAll('.philosophy-item');
    philosophyItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-up');
    });
    
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.animationDelay = `${index * 0.2}s`;
        member.classList.add('fade-up');
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add(index % 2 === 0 ? 'fade-right' : 'fade-left');
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease forwards;
        }
        
        .fade-up {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 0.8s ease forwards;
        }
        
        .fade-right {
            opacity: 0;
            transform: translateX(-30px);
            animation: fadeRight 0.8s ease forwards;
        }
        
        .fade-left {
            opacity: 0;
            transform: translateX(30px);
            animation: fadeLeft 0.8s ease forwards;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        @keyframes fadeUp {
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeRight {
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeLeft {
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .animate {
            animation-play-state: running;
        }
    `;
    document.head.appendChild(style);
    
    // Run animations on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
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