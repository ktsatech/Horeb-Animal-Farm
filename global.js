/* ==========================================================================
   GLOBAL.JS — HOREB ANIMAL FARM UNIFIED LOGIC (SHARED ONLY)
   Features: Persistent Dark/Light Theme Mode and Active Navigation Highlights.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Mode Management
    initTheme();

    // 2. Navigation Highlights
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/') + 1);
    highlightActiveNavItem(pageName);
});

/* ========== THEME MANAGEMENT ========== */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Check localStorage or default to system theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        updateThemeToggleIcon(true);
    } else {
        body.classList.remove('dark');
        updateThemeToggleIcon(false);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeToggleIcon(isDark);
        });
    }
}

function updateThemeToggleIcon(isDark) {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;
    
    if (isDark) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
}

function highlightActiveNavItem(pageName) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
