/**
 * Main JavaScript functionality for the interactive resume website
 * This file handles all dynamic behaviors including:
 * 1. Section animations using Intersection Observer
 * 2. Interactive skill items with click effects
 * 3. Smooth scrolling navigation
 * 4. Active section highlighting during scroll
 */

// Wait for DOM to be fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Section Animations Implementation
     * Uses the Intersection Observer API to detect when sections enter the viewport
     * and triggers a slide-in animation effect
     */
    const sections = document.querySelectorAll('.section');

    // Create an observer instance with custom options
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when section becomes visible
                entry.target.classList.add('animate-slide-in');
                // Stop observing after animation is triggered to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Margin around the root (viewport)
        // Negative values mean the observer will trigger slightly before the section is fully visible
        rootMargin: '-50px 0px -50px 0px',
    });

    // Start observing all section elements
    sections.forEach(section => {
        observer.observe(section);
    });

    /**
     * Interactive Skills Section
     * Adds interactive behavior to skill items:
     * - Highlights skills on click
     * - Automatically removes highlight after 2 seconds
     */
    const skills = document.querySelectorAll('.skills-column li');

    skills.forEach(skill => {
        skill.addEventListener('click', function () {
            // Toggle highlight class for visual feedback
            this.classList.toggle('highlight');

            // Future enhancement possibilities:
            // - Add tooltips with detailed skill information
            // - Implement skill filtering for projects
            // - Track skill interactions with analytics

            // Remove highlight after 2 seconds
            setTimeout(() => {
                this.classList.toggle('highlight');
            }, 2000);
        });
    });

    /**
     * Smooth Scrolling Navigation
     * Implements smooth scrolling behavior for navigation links:
     * 1. Prevents default jump behavior
     * 2. Calculates target position
     * 3. Smoothly scrolls to target section
     * 4. Updates active section highlighting
     */
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent default jump behavior

            // Extract target section ID from href attribute
            const targetId = this.getAttribute('href');

            // Process the ID to handle special cases with "-heading" suffix
            const idStringArr = targetId.split("-");
            idStringArr.pop(); // Remove "heading" suffix
            let idString = "";

            // Handle special section IDs that need to retain "-heading"
            if (targetId === "#summary-heading"
                || targetId === "#work-experience-heading"
                || targetId === "#education-heading"
                || targetId === "#skills-heading"
                || targetId === "#projects-heading") {
                idString = targetId.substring(1); // Keep original ID
            } else {
                // Reconstruct ID for other cases
                for (let i = 0; i < idStringArr.length; i++) {
                    idString = idString + idStringArr[i];
                    if (i !== idStringArr.length - 1) {
                        idString = idString + "-";
                    }
                }
            }

            const targetElement = document.getElementById(idString);

            if (targetElement) {
                // Calculate scroll position accounting for any fixed headers
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;

                // Perform smooth scroll
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active section highlighting
                highlightActiveSection();
            }
        });
    });

    /**
     * Active Section Highlighting
     * Tracks the current visible section during scrolling and updates navigation accordingly:
     * 1. Removes active state from all navigation links
     * 2. Calculates which section is currently in view
     * 3. Adds active state to corresponding navigation link
     * 4. Handles special case for homepage/index
     */
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.contact a[href^="#"]');

        // Reset all active states
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Get current scroll position
        let top = window.scrollY;

        // Check each section's position
        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;  // Offset for better UX
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id') + "-heading";

            // If section is in viewport
            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    // Highlight corresponding navigation link
                    if (links.getAttribute('href').includes(id)) {
                        links.classList.add('active');
                    }
                    // Special handling for homepage
                    else if (document.URL.endsWith("index.html") || document.URL.endsWith("/")) {
                        // Default to summary section on homepage
                        if (links.getAttribute('href') === "#summary-heading") {
                            links.classList.add('active');
                        }
                    }
                });
            }
        });
    }

    // Initialize active section highlighting
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Run once on page load
});
