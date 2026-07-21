/* ==========================================================================
   ABOUT.JS — ABOUT PAGE SPECIFIC SCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTimelineInteraction();
    initStatsCounters();
});

/* ========== ABOUT PAGE — MILESTONES & COUNTERS ========== */
function initTimelineInteraction() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const content = item.querySelector('.timeline-content');
            if (content) content.style.transform = 'translateY(-3px)';
        });
        item.addEventListener('mouseleave', () => {
            const content = item.querySelector('.timeline-content');
            if (content) content.style.transform = 'translateY(0)';
        });
    });
}

function initStatsCounters() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const animate = () => {
                        const targetElem = counter.closest('[data-target]');
                        if (!targetElem) return;

                        const target = parseInt(targetElem.getAttribute('data-target')) || 0;
                        const count = parseInt(counter.innerText) || 0;
                        const inc = Math.ceil(target / speed);

                        if (count < target) {
                            counter.innerText = count + inc;
                            setTimeout(animate, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    animate();
                });
                self.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}
