// ===============================
// Portfolio Main JS Controller
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio Loaded Successfully");
	
	// THREE.js background
    init();
    animate();
	// Scroll reveal animation
    initScrollAnimations();
	// Navigation highlight
    initActiveNavHighlight();
	   
	// Scroll indicator click → smooth scroll to Experience
    const indicator = document.querySelector(".scroll-indicator");

    if (indicator) {
        indicator.addEventListener("click", () => {
            document.querySelector("#experience")
                .scrollIntoView({ behavior: "smooth" });
        });
    }

});


// ===============================
// Fade-in Animation on Scroll
// ===============================
function initScrollAnimations() {

    const elements = document.querySelectorAll(".glass");

    elements.forEach(el => {
        el.classList.add("opacity-0", "translate-y-6", "transition", "duration-700");
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-6");
                entry.target.classList.add("opacity-100", "translate-y-0");
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}


// ===============================
// Active Navigation Highlight
// ===============================
function initActiveNavHighlight() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("text-cyan-400");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("text-cyan-400");
            }
        });
    });
}
