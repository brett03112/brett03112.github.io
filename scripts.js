/**
 * scripts.js - Main JavaScript functionality for Brett Smith's Resume Website
 * Handles animations, interactive elements, and smooth scrolling navigation
 */

document.addEventListener('DOMContentLoaded', function () {
    // Section animations using Intersection Observer
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '-50px 0px -50px 0px',
    });

    sections.forEach(section => observer.observe(section));

    // Interactive skill items with click highlight effect
    const skills = document.querySelectorAll('.skills-column li');
    skills.forEach(skill => {
        skill.addEventListener('click', function () {
            this.classList.toggle('highlight');
            setTimeout(() => {
                this.classList.toggle('highlight');
            }, 2000);
        });
    });

    // Smooth scrolling navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.getElementById(targetId.substring(1));

            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                highlightActiveSection();
            }
        });
    });

    // Active section highlighting during scroll
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.contact a[href^="#"]');

        navLinks.forEach(link => link.classList.remove('active'));

        const scrollPosition = window.scrollY;
        sections.forEach(section => {
            const offset = section.offsetTop - 150;
            const height = section.offsetHeight;
            const id = section.getAttribute('id') + "-heading";

            if (scrollPosition >= offset && scrollPosition < offset + height) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href').includes(id)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();
});
