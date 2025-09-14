# TasteHub Restaurant Website

## Overview
TasteHub is a modern, responsive multi-page restaurant website with a clean and attractive design. The website features a cohesive color scheme using red (#FF3B30), blue (#007AFF), and yellow (#FFD60A) to create a visually appealing experience for users.

## Features

### Multi-Page Structure
- **Home Page**: Features a hero section, about section, menu preview, special offers, testimonials, and call-to-action.
- **Menu Page**: Displays food categories (Starters, Mains, Desserts, Drinks) with item cards and cart functionality.
- **Order Page**: Includes cart management, checkout form with delivery/pickup options, and order confirmation.
- **Reservation Page**: Provides a booking form with date/time selection and confirmation system.
- **Gallery Page**: Showcases restaurant images in a masonry grid layout with filtering and lightbox functionality.
- **About Us Page**: Tells the restaurant's story, introduces the team, and displays the restaurant's journey.
- **Contact Page**: Offers contact form, location map, business information, and FAQ section.

### Special Features
- **Responsive Design**: Fully responsive across all device sizes.
- **Dark Mode Toggle**: Users can switch between light and dark themes.
- **Sticky Navigation**: Navigation bar remains accessible while scrolling.
- **Interactive Elements**: Includes animations, hover effects, and micro-interactions.
- **Cart Functionality**: Add, remove, and update items in the cart with localStorage persistence.
- **Form Validation**: Client-side validation for all forms with helpful error messages.
- **Image Gallery**: Filterable gallery with lightbox for enlarged image viewing.

## Technologies Used
- HTML5
- CSS3 (with custom properties for theming)
- JavaScript (vanilla, no frameworks)
- Font Awesome (for icons)
- Google Maps (for location embedding)

## Project Structure
```
├── index.html              # Home page
├── menu.html               # Menu page
├── order.html              # Order page
├── reservation.html        # Reservation page
├── gallery.html            # Gallery page
├── about.html              # About Us page
├── contact.html            # Contact page
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── menu.css            # Menu page styles
│   ├── order.css           # Order page styles
│   ├── reservation.css     # Reservation page styles
│   ├── gallery.css         # Gallery page styles
│   ├── about.css           # About Us page styles
│   └── contact.css         # Contact page styles
├── js/
│   ├── script.js           # Main JavaScript file
│   ├── menu.js             # Menu page functionality
│   ├── order.js            # Order page functionality
│   ├── reservation.js      # Reservation page functionality
│   ├── gallery.js          # Gallery page functionality
│   ├── about.js            # About Us page functionality
│   └── contact.js          # Contact page functionality
└── images/                 # Image assets (not included in this repository)
```

## How to Run
1. Clone or download this repository
2. Create an `images` folder and add appropriate images
3. Open `index.html` in your web browser

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements
- Backend integration for form submissions
- User authentication for order history
- Online payment processing
- Admin dashboard for menu management
- Table reservation system with real-time availability

## Credits
- Design concept and implementation: TasteHub Team
- Icons: Font Awesome
- Fonts: Google Fonts

## License
This project is available for personal and commercial use with attribution.