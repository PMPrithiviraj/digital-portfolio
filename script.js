// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorGlow = document.querySelector('.custom-cursor-glow');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
});

// Cursor hover effect
document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navbar = document.getElementById('navbar');
const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
const closeIcon = mobileMenuToggle.querySelector('.close-icon');

mobileMenuToggle.addEventListener('click', () => {
    navbar.classList.toggle('mobile-open');
    
    if (navbar.classList.contains('mobile-open')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('mobile-open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    });
});

// 3D tilt effect on avatar
const avatarContainer = document.getElementById('avatarContainer');

window.addEventListener('mousemove', (e) => {
    if (avatarContainer && window.innerWidth > 768) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xRotation = ((clientY / innerHeight) - 0.5) * 20;
        const yRotation = ((clientX / innerWidth) - 0.5) * 20;
        
        avatarContainer.style.transform = `perspective(1000px) rotateX(${-xRotation}deg) rotateY(${yRotation}deg) translateZ(50px)`;
    }
});

// Floating shapes parallax
const floatingShapes = document.querySelector('.floating-shapes');

window.addEventListener('mousemove', (e) => {
    if (floatingShapes && window.innerWidth > 768) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const moveX = (clientX / innerWidth - 0.5) * 30;
        const moveY = (clientY / innerHeight - 0.5) * 30;
        
        floatingShapes.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// 3D tilt effect on about card
const aboutCard = document.getElementById('aboutCard');

if (aboutCard) {
    aboutCard.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = aboutCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            aboutCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
    });
    
    aboutCard.addEventListener('mouseleave', () => {
        aboutCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Animate social cards
            if (entry.target.classList.contains('contact')) {
                animateSocialCards();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.about-container, .skills, .project-card, .contact').forEach(el => {
    observer.observe(el);
});

// Animate skill bars
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            const skillLevel = item.getAttribute('data-skill');
            const progressBar = item.querySelector('.skill-progress');
            progressBar.style.width = skillLevel + '%';
        }, index * 100);
    });
}

// Animate social cards
function animateSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
}

// 3D tilt effect on project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger animation for visible elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '1';
    });
});

console.log('%c Portfolio loaded successfully! ', 'background: #10b981; color: #fff; padding: 10px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('%c Made with ❤️ by Prithiviraj ', 'background: #06b6d4; color: #fff; padding: 5px; border-radius: 3px;');
