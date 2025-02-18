// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for Section Animations
    // Adds slide-in animation when sections come into view
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        rootMargin: '-50px 0px -50px 0px', // Trigger animation a bit before the section is fully visible. Experiment!
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Interactive Skill Items
    // Adds hover effects and temporary highlight on click
    const skills = document.querySelectorAll('.skills-column li');

    skills.forEach(skill => {
        skill.addEventListener('click', function () {
            // Simple example: Toggle a 'highlight' class
            this.classList.toggle('highlight');

            // You could do more complex things here, like:
            // - Show a tooltip with more info about the skill
            // - Filter projects based on the selected skill (if you had a project filter)
            // - Send an event to Google Analytics to track skill clicks

            //Simple animation to "un-toggle" the skill
            setTimeout(() => {
                this.classList.toggle('highlight');
            }, 2000) //remove highlight after two seconds.

        });
    });

    // Smooth Scrolling Navigation
    // Handles anchor links with smooth scrolling behavior

    // Select all links that start with '#' (hash links)
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent the default jump

            //check the anchor string (minus the hash).  Make it work
            // even without id on element
            const targetId = this.getAttribute('href');

            const idStringArr = targetId.split("-")
            idStringArr.pop() //remove "-heading" text.
            let idString = ""
            //if we are targeting a section add "-heading" back
            if (targetId === "#summary-heading"
                || targetId === "#work-experience-heading"
                || targetId === "#education-heading"
                || targetId === "#skills-heading"
                || targetId === "#projects-heading") {

                idString = targetId.substring(1); //just keep the orginal string

            } else {
                //loop through id's to append id string
                for (let i = 0; i < idStringArr.length; i++) {
                    idString = idString + idStringArr[i]
                    if (i !== idStringArr.length - 1) { //if last iteration, no "-"
                        idString = idString + "-"
                    }
                }
            }

            //console.log(idString)

            const targetElement = document.getElementById(idString);

            if (targetElement) {
                // Calculate the top offset, accounting for any fixed header
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;

                //scroll to target section
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // The smooth scrolling part!
                });

                // --- Highlight Active Section ---
                highlightActiveSection();
            }
        });
    });

    // Active Section Highlighting
    // Updates navigation to show current section while scrolling
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.section');  // Or a more specific selector
        const navLinks = document.querySelectorAll('.contact a[href^="#"]');

        //remove any active styles from nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        })

        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;  // Adjust this offset as needed
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id') + "-heading"; //this accounts for the extra "-heading" on links
            //  console.log(id)
            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    //add active style to the proper link
                    if (links.getAttribute('href').includes(id)) {
                        links.classList.add('active');
                    }
                    //special handling if no active class found and
                    // the url endswith index.html, default active
                    // summary.
                    else if (document.URL.endsWith("index.html") || document.URL.endsWith("/")) {

                        //default the first item (summary to have class).
                        if (links.getAttribute('href') === "#summary-heading") {
                            links.classList.add('active');
                        }

                    }

                });
            };
        });

    }

    //run active section highligher on scroll and initial page load
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();
});
