// TasteHub Restaurant Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle for Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && !event.target.closest('.nav-menu') && !event.target.closest('.nav-toggle')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Update icon
            updateDarkModeIcon(isDarkMode);
        });
    }
    
    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Hide all testimonials except the first one
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                testimonials[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % testimonials.length;
                testimonials[currentSlide].style.display = 'block';
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                testimonials[currentSlide].style.display = 'none';
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                testimonials[currentSlide].style.display = 'block';
            });
        }
    }
    
    // Video Play Button
    const playButton = document.querySelector('.play-button');
    const videoContainer = document.querySelector('.video-container');
    
    if (playButton && videoContainer) {
        playButton.addEventListener('click', function() {
            const placeholderImg = videoContainer.querySelector('.placeholder-img');
            const iframe = document.createElement('iframe');
            
            // Replace with actual YouTube embed URL
            iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            // Replace image with iframe
            if (placeholderImg) {
                videoContainer.removeChild(placeholderImg);
                videoContainer.removeChild(playButton);
                videoContainer.appendChild(iframe);
                
                // Adjust container style for video
                videoContainer.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
                videoContainer.style.height = '0';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Add micro-animations to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            
            if (this.classList.contains('btn-red')) {
                this.style.boxShadow = '0 0 15px rgba(255, 59, 48, 0.5)';
            } else if (this.classList.contains('btn-yellow')) {
                this.style.boxShadow = '0 0 15px rgba(255, 214, 10, 0.5)';
            } else if (this.classList.contains('btn-blue')) {
                this.style.boxShadow = '0 0 15px rgba(0, 122, 255, 0.5)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});