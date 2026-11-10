

// Mobile Navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );

    menuToggle.innerHTML = isOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

    if (window.lucide) {
        lucide.createIcons();
    }
});

// Close mobile menu after clicking a navigation link
const navItems = document.querySelectorAll('.nav-link');

navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');

        menuToggle.innerHTML = '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }
    });
});

// Active Navigation Section
const sections = document.querySelectorAll('main section[id]');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: '-35% 0px -55% 0px'
});

sections.forEach(section => observer.observe(section));

// Scroll Progress Bar
const progress = document.getElementById('scrollProgress');

function updateProgress() {
    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

    const percentage = scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    progress.style.width = `${percentage}%`;
}

window.addEventListener('scroll', updateProgress, {
    passive: true
});

updateProgress();

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// Typing Animation
const roles = [
    'Aspiring Developer',
    'Frontend Enthusiast',
    'Problem Solver'
];

const typingText = document.getElementById('typingText');

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    const current = roles[roleIndex];

    typingText.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(typeRole, 90);
    }

    else if (!deleting) {
        deleting = true;
        setTimeout(typeRole, 1300);
    }

    else if (charIndex > 0) {
        charIndex--;
        setTimeout(typeRole, 42);
    }

    else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 250);
    }
}

// Respect reduced-motion settings
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typeRole();
}

// Dark / Light Theme Toggle (saves the selected theme)
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

function updateThemeButton() {
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight
        ? '<i data-lucide="moon"></i>'
        : '<i data-lucide="sun"></i>';
    themeToggle.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark mode' : 'Switch to light mode'
    );
    themeToggle.setAttribute(
        'title',
        isLight ? 'Switch to dark mode' : 'Switch to light mode'
    );
    if (window.lucide) lucide.createIcons();
}

updateThemeButton();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem(
        'portfolio-theme',
        document.body.classList.contains('light-theme') ? 'light' : 'dark'
    );
    updateThemeButton();
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById('nameError').textContent =
        name.length < 2 ? 'Please enter at least 2 characters.' : '';
    document.getElementById('emailError').textContent =
        !emailPattern.test(email) ? 'Please enter a valid email address.' : '';
    document.getElementById('messageError').textContent =
        message.length < 10 ? 'Please enter at least 10 characters.' : '';

    const isValid =
        name.length >= 2 &&
        emailPattern.test(email) &&
        message.length >= 10;

    if (!isValid) {
        formStatus.textContent = 'Please correct the highlighted fields.';
        formStatus.style.color = '#ff8d9b';
        return;
    }

    formStatus.textContent =
        'Your details are valid! The form is not connected to an email service yet.';
    formStatus.style.color = 'var(--cyan)';
    contactForm.reset();
});

// Clear each field's error while the user edits it.
[
    ['contactName', 'nameError'],
    ['contactEmail', 'emailError'],
    ['contactMessage', 'messageError']
].forEach(([fieldId, errorId]) => {
    document.getElementById(fieldId).addEventListener('input', () => {
        document.getElementById(errorId).textContent = '';
        formStatus.textContent = '';
    });
});

// Automatic Copyright Year
document.getElementById('year').textContent =
    new Date().getFullYear();

// Initialize Lucide Icons
if (window.lucide) {
    lucide.createIcons();
}

