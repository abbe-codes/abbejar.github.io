// Portfolio Website JavaScript
// Author: Abbe Jarbou

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    // Theme Toggle Functionality
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    });
    
    // Form Submission (placeholder functionality)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Validate form (simple validation)
            let isValid = true;
            const requiredFields = ['name', 'email', 'subject', 'message'];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!formValues[field] || formValues[field].trim() === '') {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formValues.email)) {
                isValid = false;
                document.getElementById('email').style.borderColor = 'red';
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
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
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to reveal animations
    const revealElements = document.querySelectorAll('.skills-category, .timeline-item, .project-card, .education-item, .certification-item');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add CSS class for revealed elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on initial load and scroll
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Add CSS for header scroll effect
    const style = document.createElement('style');
    style.textContent = `
        .header {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .header.scrolled {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .mobile-menu-btn span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .mobile-menu-btn span.active:nth-child(2) {
            opacity: 0;
        }
        .mobile-menu-btn span.active:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
});
