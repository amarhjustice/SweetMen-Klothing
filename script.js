/*
    Pure JavaScript for SKLODING Fashion Portfolio
    This file handles all interactive elements and dynamic behaviors.
    Comments are added to explain each section's functionality.
*/

document.addEventListener('DOMContentLoaded', () => {
   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor link behavior (instant jump)

            const targetId = this.getAttribute('href'); // Get the href attribute (e.g., "#about")
            const targetElement = document.querySelector(targetId); // Find the corresponding section element

            if (targetElement) {
                // Calculate offset for fixed header
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found
                
                // Get the element's position relative to the document
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // Calculate the final scroll position, subtracting header height and adding extra padding
                const offsetPosition = elementPosition - headerOffset - 20; // Added extra 20px padding for visual spacing

                // Scroll smoothly to the calculated position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if it's open after clicking a link
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.classList.contains('visible')) {
                mobileMenu.classList.remove('visible');
                mobileMenu.classList.add('hidden'); // Ensure it becomes hidden
            }
        });
    });

    // ----------------------------------------------------------------------
    // 2. Mobile Menu Toggle Functionality
    // ----------------------------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // Event listener for opening the mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden'); // Remove hidden class to allow transition
            mobileMenu.classList.add('visible'); // Add visible class to trigger slide-in animation
        });
    }

    // Event listener for closing the mobile menu
    if (closeMobileMenuButton) {
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('visible'); // Remove visible class to trigger slide-out animation
            mobileMenu.classList.add('hidden'); // Add hidden class after animation to prevent interaction
        });
    }

    // ----------------------------------------------------------------------
    // 3. Intersection Observer for Fade-In Animations (Scroll-triggered)
    // ----------------------------------------------------------------------
    // Select all elements that should animate on scroll
    const fadeElements = document.querySelectorAll('.fade-in-up');

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // 'null' means the viewport is the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // Callback function executed when observed elements intersect the viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is visible, add the 'visible' class
                entry.target.classList.add('visible');
                // Stop observing the element once it has animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each fade-in element
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ----------------------------------------------------------------------
    // 4. Hero Section Initial Animations
    // ----------------------------------------------------------------------
    // Immediately trigger animations for elements within the hero section
    // By removing 'opacity-0' at DOMContentLoaded, the CSS animations apply.
    const heroTitle = document.querySelector('.hero-title-animate');
    const heroButton = document.querySelector('.hero-button-animate');

    if (heroTitle) {
        heroTitle.classList.remove('opacity-0');
    }
    if (heroButton) {
        heroButton.classList.remove('opacity-0');
    }

    // ----------------------------------------------------------------------
    // 5. About Section Slideshow Logic
    // ----------------------------------------------------------------------
    //let slideIndex = 1;  Tracks the current slide being displayed
    let slideshowInterval; // Variable to hold the interval ID for auto-play

    // Function to display a specific slide
    let slideIndex = 0; // Or your existing slideIndex variable

function showSlides() {
    let i;
    let imageSlides = document.getElementsByClassName("about-slide");
    let textSlides = document.getElementsByClassName("about-text-slide"); // Get all text slides
    let dots = document.getElementsByClassName("dot");

    // Hide all image slides and remove active class
    for (i = 0; i < imageSlides.length; i++) {
        imageSlides[i].classList.remove("active");
    }

    // Hide all text slides and remove active class
    for (i = 0; i < textSlides.length; i++) {
        textSlides[i].classList.remove("active");
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slideIndex++; // Increment slide index
    if (slideIndex > imageSlides.length) { // Loop back to the first slide if at the end
        slideIndex = 1;
    }

    // Show the current image slide
    imageSlides[slideIndex - 1].classList.add("active");

    // Show the corresponding text slide
    textSlides[slideIndex - 1].classList.add("active");

    // Activate the corresponding dot
    dots[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 9000); // Change slide every 4 seconds (adjust as needed)
}

// Call showSlides initially to start the slideshow
showSlides();

// Add event listeners for prev/next buttons (if you have them)
// Make sure these also update text slides
function plusSlides(n) {
    // Find current active slide
    let currentImageIndex = -1;
    let imageSlides = document.getElementsByClassName("about-slide");
    for (let i = 0; i < imageSlides.length; i++) {
        if (imageSlides[i].classList.contains("active")) {
            currentImageIndex = i;
            break;
        }
    }

    // Calculate new slideIndex based on current and 'n' (1 for next, -1 for prev)
    slideIndex = currentImageIndex + n + 1; // +1 because slideIndex is 1-based internally

    // Handle wrapping around
    if (slideIndex > imageSlides.length) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = imageSlides.length;
    }

    // Re-call showSlides to update everything
    showSlidesManual(slideIndex);
}

// Modified showSlides for manual navigation (dots/arrows)
function currentSlide(n) {
    showSlidesManual(n);
}



// --- Testimonials Section JavaScript ---

let testimonialIndex = 0; // Keep track of the current testimonial

// Function to show a specific testimonial
function showTestimonial(n) {
    let testimonials = document.getElementsByClassName("testimonial-item");

    // If no testimonials or only one, do nothing
    if (testimonials.length === 0) return;

    // Handle wrapping around (if n is greater than total testimonials, go to first)
    if (n >= testimonials.length) {
        testimonialIndex = 0; // Go to the first testimonial
    } else if (n < 0) { // If n is less than 0, go to the last testimonial
        testimonialIndex = testimonials.length - 1;
    } else {
        testimonialIndex = n; // Set to the requested index
    }

    // Hide all testimonials first
    for (let i = 0; i < testimonials.length; i++) {
        testimonials[i].classList.remove("active");
    }

    // Show the active testimonial
    testimonials[testimonialIndex].classList.add("active");
}

// Function for next/previous controls
function plusTestimonial(n) {
    showTestimonial(testimonialIndex + n);
}

// Initial call to display the first testimonial
// (This will run once the script loads)
showTestimonial(testimonialIndex); // Displays the testimonial at index 0 initially


// --- Event Listeners for Testimonial Arrows ---

    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            plusTestimonial(-1); // Go to previous
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            plusTestimonial(1); // Go to next
        });
    }


// --- End Testimonials Section JavaScript ---


// A helper function to show a specific slide manually without auto-advancing
function showSlidesManual(n) {
    let imageSlides = document.getElementsByClassName("about-slide");
    let textSlides = document.getElementsByClassName("about-text-slide");
    let dots = document.getElementsByClassName("dot");

    // Hide all
    for (let i = 0; i < imageSlides.length; i++) {
        imageSlides[i].classList.remove("active");
        textSlides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }

    // Activate the selected slide (n is 1-based)
    imageSlides[n - 1].classList.add("active");
    textSlides[n - 1].classList.add("active");
    dots[n - 1].classList.add("active");

    // Reset the auto-advance timer
    clearTimeout(slideshowTimer); // Assuming you store the timeout in a variable
    slideIndex = n - 1; // Update global slideIndex for the next auto-advance
    slideshowTimer = setTimeout(showSlides, 4000); // Restart the timer
}

// IMPORTANT: Make sure your auto-advance timer is stored in a global variable
// For example, change: setTimeout(showSlides, 4000);
// To: slideshowTimer = setTimeout(showSlides, 4000);
// And declare: let slideshowTimer; at the top of your script.

    // ----------------------------------------------------------------------
    // 6. Gallery Carousel Logic (Continuous Spinning Wheel)
    // ----------------------------------------------------------------------
    const carouselTrack = document.getElementById('carousel-track');
    let originalGalleryItems = []; // Array to store original gallery items
    let scrollSpeed = 0.5; // Default pixels per frame (adjusted for smoother initial load)
    let animationFrameId; // Stores the ID of the requestAnimationFrame call

    function initializeCarousel() {
        if (!carouselTrack) return; // Exit if carouselTrack doesn't exist

        // Store original items and clear the track to prevent duplicates
        originalGalleryItems = Array.from(carouselTrack.getElementsByClassName('gallery-item'));
        carouselTrack.innerHTML = ''; // Clear the track content

        // Append original items and then clones for seamless looping
        // We clone enough items to create a continuous loop effect without visible jumps.
        // Cloning all original items once is a good start.
        originalGalleryItems.forEach(item => {
            carouselTrack.appendChild(item); // Re-add original items
        });
        originalGalleryItems.forEach(item => {
            carouselTrack.appendChild(item.cloneNode(true)); // Append clones
        });

        // Calculate scroll speed dynamically based on content width.
        // Use setTimeout to ensure elements have rendered and their widths are accurate.
        setTimeout(() => {
            const totalOriginalWidth = originalGalleryItems.reduce((sum, item) => {
                // Get the computed style for 'gap' if it's applied to the flex container
                const gapStyle = window.getComputedStyle(carouselTrack).getPropertyValue('gap');
                const gapInPx = parseFloat(gapStyle) || 0; // Convert rem to px if needed, or use 0
                return sum + item.offsetWidth + gapInPx;
            }, 0);

            // A rough estimate for total width. It might be slightly off due to rounding or invisible gaps.
            // A safer approach might be to measure scrollWidth directly after cloning.
            const carouselContentWidth = carouselTrack.scrollWidth / 2; // The width of one full set of original items (since we doubled them)

            // Define a desired loop duration (e.g., 35 seconds)
            const desiredLoopDurationSeconds = 35;
            // Calculate speed in pixels per frame (assuming ~60 frames per second)
            scrollSpeed = carouselContentWidth / (desiredLoopDurationSeconds * 60);

            // Ensure scrollSpeed is a reasonable positive number
            if (isNaN(scrollSpeed) || scrollSpeed <= 0) {
                scrollSpeed = 0.5; // Fallback speed if calculation results in invalid number
                console.warn("Calculated carousel scroll speed is invalid, using fallback: " + scrollSpeed);
            }
            
            // Start the animation loop
            animateCarousel();
        }, 100); // Small delay to allow browser to render elements and compute widths
    }

    // Animation loop function for the carousel
    function animateCarousel() {
        // Move the scroll position to the right
        carouselTrack.scrollLeft += scrollSpeed;

        // If the scroll position has passed the width of the original content (first half of the track),
        // instantly jump back to the beginning to create a seamless loop.
        if (carouselTrack.scrollLeft >= carouselTrack.scrollWidth / 2) {
            carouselTrack.scrollLeft = 0; // Reset to the start of the original content
        }

        // Request the next animation frame to continue the loop
        animationFrameId = requestAnimationFrame(animateCarousel);
    }

    // Function to stop the carousel animation
    function stopCarouselAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId); // Cancel the ongoing animation frame
            animationFrameId = null; // Clear the ID
        }
    }

    // Event listener to pause/resume carousel animation when tab visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // If the tab is hidden, stop the animation to save resources
            stopCarouselAnimation();
        } else {
            // If the tab becomes visible, resume the animation if it's not already running
            if (!animationFrameId) {
                animateCarousel(); // Resume the animation
            }
        }
    });

    // Initialize the carousel when the DOM is fully loaded
    initializeCarousel();
});

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (event) => {
      event.preventDefault();
    status.style.display = "block"; // ensure visible
    status.style.fontWeight = "600"; // make it readable
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      status.textContent = "✅ Thank you! Your message has been sent.";
      form.reset();
    } else {
      status.textContent = "❌ Oops! Something went wrong. Please try again.";
    }
  });

 
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-btn");
  let lastTap = 0;

  document.querySelectorAll(".gallery-item-img").forEach((img) => {
    // Desktop: click opens lightbox
    img.addEventListener("click", () => {
      // Only trigger if not on a touch device
      if (!("ontouchstart" in window)) {
        openLightbox(img.src);
      }
    });

    // Mobile: detect double tap to open lightbox
    img.addEventListener("touchend", (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        openLightbox(img.src);
        e.preventDefault();
      }
      lastTap = currentTime;
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("open");
  }

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("open");
      lightboxImg.src = "";
    }
  });
});


