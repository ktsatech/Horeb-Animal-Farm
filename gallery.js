/* ==========================================================================
   GALLERY.JS — GALLERY PAGE SPECIFIC SCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAjaxGallery();
});

/* ========== GALLERY PAGE — AJAX ASYNC LOADER ========== */
function initAjaxGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading" style="text-align: center; padding: 3rem; color: var(--text-secondary);"><i class="fas fa-spinner fa-spin"></i> Loading premium images via AJAX...</div>';

    // Fetch images database via Fetch API (AJAX)
    fetch('images.json')
        .then(res => {
            if (!res.ok) throw new Error('Database file images.json not found');
            return res.json();
        })
        .then(data => {
            const imagesList = data.images;
            renderGalleryCards(imagesList);
            setupGalleryFilters(imagesList);
        })
        .catch(err => {
            console.error('AJAX Gallery Error:', err);
            grid.innerHTML = `<div class="no-results" style="text-align: center; padding: 3rem; color: var(--accent);">⚠️ AJAX Fetch Failure: ${err.message}. Please verify images.json exists.</div>`;
        });
}

function renderGalleryCards(images) {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    if (images.length === 0) {
        grid.innerHTML = '<div class="no-results" style="text-align: center; padding: 3rem; color: var(--text-secondary);">No farm pictures found.</div>';
        return;
    }

    grid.innerHTML = images.map((img, index) => `
        <div class="gallery-card" style="animation-delay: ${index * 0.1}s">
            <div class="card-img-wrapper">
                <div class="gallery-img" style="background-image: url('${img.url}')"></div>
            </div>
            <div class="card-info">
                <h3>${escapeHtml(img.title)}</h3>
                <p>${escapeHtml(img.description)}</p>
                <span class="category-badge">${img.category === 'rabbit' ? '🐇 Rabbit' : img.category === 'layer' ? '🐔 Layer Hen' : '🐖 Pig'}</span>
            </div>
        </div>
    `).join('');
}

function setupGalleryFilters(allImages) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const categoryFilter = btn.getAttribute('data-filter');
            if (categoryFilter === 'all') {
                renderGalleryCards(allImages);
            } else {
                const filtered = allImages.filter(img => img.category === categoryFilter);
                renderGalleryCards(filtered);
            }
        });
    });
}

/* ========== UTILITIES ========== */
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
            default: return m;
        }
    });
}
