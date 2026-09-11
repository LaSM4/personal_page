// ═══════════════════════════════════════════
// Dark Mode Toggle
// ═══════════════════════════════════════════

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Restore saved theme
(function () {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
})();


// ═══════════════════════════════════════════
// Mobile Menu
// ═══════════════════════════════════════════

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

// Close mobile menu when clicking a nav link
document.querySelectorAll('#sidebar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            toggleMobileMenu();
        }
    });
});


// ═══════════════════════════════════════════
// Scroll Animations (Intersection Observer)
// ═══════════════════════════════════════════

const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => {
    fadeObserver.observe(el);
});


// ═══════════════════════════════════════════
// Active Nav Link on Scroll
// ═══════════════════════════════════════════

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-10% 0px -70% 0px'
});

sections.forEach(section => {
    navObserver.observe(section);
});
