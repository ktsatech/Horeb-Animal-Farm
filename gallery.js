/* ==========================================================================
   GALLERY.JS — GALLERY PAGE SPECIFIC SCRIPT LOGIC
   ========================================================================== */

import imagesData from './public/images.json';

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});

/* ========== GALLERY PAGE INITIALIZER ========== */
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    // 3D Carousel image URLs to prioritize at the very beginning of the gallery
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

    let imagesList = (imagesData && imagesData.images) ? imagesData.images : [
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

    const sortedImages = sortImagesBy3DFirst(imagesList);
    renderGalleryCards(sortedImages);
    setupGalleryFilters(sortedImages);
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
