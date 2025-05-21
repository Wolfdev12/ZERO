const navbar = document.getElementById('navbar');
window.onscroll = function() {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const isExpanded = navLinks.classList.contains('show');
    hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
        hamburgerBtn.innerHTML = '<i class="fas fa-times"></i>'; // Change to X icon
    } else {
        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>'; // Change back to bars
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

function copyAddress() {
    const tokenAddress = document.getElementById('tokenAddress').innerText;
    const feedback = document.getElementById('copyFeedback');
    try {
        const textArea = document.createElement('textarea');
        textArea.value = tokenAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy'); // For broader browser compatibility
        document.body.removeChild(textArea);

        feedback.textContent = 'Copied to clipboard!';
        feedback.style.color = '#4CAF50'; // Green for success
    } catch (err) {
        console.error('Failed to copy: ', err);
        feedback.textContent = 'Failed to copy!';
        feedback.style.color = '#F44336'; // Red for failure
    }
    setTimeout(() => { // Clear feedback message after 2 seconds
        feedback.textContent = '';
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.warn("Element with ID 'currentYear' not found for updating the year.");
    }

    // Scroll Animation Logic
    const scrollElements = document.querySelectorAll(".scroll-animate");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        // Check if element top is within the viewport (or a fraction of it)
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("is-visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            const delay = parseInt(el.dataset.delay) || 0; // Get delay from data-delay attribute
            if (elementInView(el, 1.25)) { // Trigger when element is 1/1.25th into view
                setTimeout(() => {
                    displayScrollElement(el);
                }, delay);
            }
        });
    };

    // Initial check on load
    handleScrollAnimation();
    // Add scroll event listener
    window.addEventListener("scroll", handleScrollAnimation);
});