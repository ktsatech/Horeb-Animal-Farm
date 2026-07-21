/* ==========================================================================
   INDEX.JS — HOME PAGE SPECIFIC SCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    init3DCarousel();
    initFarmCardLinks();
});

/* ========== HOMEPAGE — 3D CAROUSEL ========== */
function init3DCarousel() {
    const container = document.getElementById('carouselContainer');
    if (!container) return;

    // Carousel Image Database
    const images = [
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHl02Ves-ug5hYtplqE50-CEEdOSHjdhWw2Fc6f-EPNA&s=10", title: "Large White Pigs" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLaWF2ti3pPJppogbiR0OMD228Gkv5kDCHdMvpPBkUQ&s=10", title: "Point of Lay Birds" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQex7W7bLcMEltODy3FnIwQC30bjAEPMF_E06Umc_gi8Q&s=10", title: "Our Layer Harvest" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjP6ybIyTOav295uSvarPBNHKisP2OTdx_VLyU2qI9dA&s=10", title: "Flemish Giant Rabbits" }
    ];

    const count = images.length;
    const stepAngle = 360 / count;
    const radius = window.innerWidth < 768 ? 180 : 280; // Adjust depth for responsive layouts

    // Dynamically spawn 3D cards
    container.innerHTML = '';
    images.forEach((img, i) => {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.style.backgroundImage = `url('${img.url}')`;
        card.style.transform = `rotateY(${i * stepAngle}deg) translateZ(${radius}px)`;
        container.appendChild(card);
    });

    let currentAngle = 0;
    
    const rotateCarousel = () => {
        container.style.transform = `rotateY(${currentAngle}deg)`;
    };

    // Controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentAngle += stepAngle;
            rotateCarousel();
            resetAutoRotation();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentAngle -= stepAngle;
            rotateCarousel();
            resetAutoRotation();
        });
    }

    // Auto rotate
    let autoRotateInterval = setInterval(() => {
        currentAngle -= stepAngle;
        rotateCarousel();
    }, 4000);

    function resetAutoRotation() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            currentAngle -= stepAngle;
            rotateCarousel();
        }, 4000);
    }
}

function initFarmCardLinks() {
    const farmCards = document.querySelectorAll('.farm-card');
    farmCards.forEach(card => {
        card.addEventListener('click', () => {
            const farmId = card.getAttribute('data-farm');
            if (farmId) {
                // Store selections to pre-fill on contact page
                localStorage.setItem('selectedFarm', farmId);
                window.location.href = 'contact.html';
            }
        });
    });
}
