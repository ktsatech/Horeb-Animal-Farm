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

    const carouselUrls = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHl02Ves-ug5hYtplqE50-CEEdOSHjdhWw2Fc6f-EPNA&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLaWF2ti3pPJppogbiR0OMD228Gkv5kDCHdMvpPBkUQ&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQex7W7bLcMEltODy3FnIwQC30bjAEPMF_E06Umc_gi8Q&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjP6ybIyTOav295uSvarPBNHKisP2OTdx_VLyU2qI9dA&s=10"
    ];

    const sortImagesBy3DFirst = (imagesList) => {
        return [...imagesList].sort((a, b) => {
            const aIndex = carouselUrls.indexOf(a.url);
            const bIndex = carouselUrls.indexOf(b.url);
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return 0;
        });
    };

    // Fetch images database via Fetch API (AJAX)
    fetch('images.json')
        .then(res => {
            if (!res.ok) throw new Error('Database file images.json not found');
            return res.json();
        })
        .then(data => {
            let imagesList = data.images || [];
            imagesList = sortImagesBy3DFirst(imagesList);
            renderGalleryCards(imagesList);
            setupGalleryFilters(imagesList);
        })
        .catch(err => {
            console.warn('AJAX Gallery Loading Issue:', err);
            
            // Styled clean error notice
            const errorHtml = `
                <div class="error-notice" style="grid-column: 1 / -1; text-align: center; padding: 1.5rem; color: var(--accent); background: var(--accent-light); border-radius: var(--border-radius); font-weight: 700; border: 1px solid var(--accent); margin-bottom: 2rem; box-shadow: var(--shadow);">
                    ⚠️ ERROR LOADING IMAGES
                </div>
            `;
            
            // Secure fallback data to keep the gallery functional
            const fallbackList = [
                {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHl02Ves-ug5hYtplqE50-CEEdOSHjdhWw2Fc6f-EPNA&s=10",
                    "title": "Layer Birds Production",
                    "description": "Our high-producing point-of-lay hens housed in clean, biosensitive housing systems with optimized organic feed structures.",
                    "category": "layer"
                },
                {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLaWF2ti3pPJppogbiR0OMD228Gkv5kDCHdMvpPBkUQ&s=10",
                    "title": "ISA Brown Layers",
                    "description": "Elite ISA Brown layers starting their highly productive egg cycles, producing thick-shelled and rich daily egg harvests.",
                    "category": "layer"
                },
                {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQex7W7bLcMEltODy3FnIwQC30bjAEPMF_E06Umc_gi8Q&s=10",
                    "title": "Flemish Giant Breeder",
                    "description": "Our premier Flemish Giant rabbits showing excellent conformation, massive bodies, and outstanding docility for elite breeding stocks.",
                    "category": "rabbit"
                },
                {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjP6ybIyTOav295uSvarPBNHKisP2OTdx_VLyU2qI9dA&s=10",
                    "title": "Large White Pigs",
                    "description": "Robust Large White pig lines exhibiting exceptional growth rates, solid maternal properties, and highly balanced feed conversion.",
                    "category": "pig"
                }
            ];

            const sortedFallback = sortImagesBy3DFirst(fallbackList);
            renderGalleryCards(sortedFallback, errorHtml);
            setupGalleryFilters(sortedFallback);
        });
}

function renderGalleryCards(images, errorNoticeHtml = '') {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    if (images.length === 0) {
        grid.innerHTML = errorNoticeHtml + '<div class="no-results" style="text-align: center; padding: 3rem; color: var(--text-secondary);">No farm pictures found.</div>';
        return;
    }

    const cardsHtml = images.map((img, index) => `
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

    grid.innerHTML = errorNoticeHtml + cardsHtml;
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
