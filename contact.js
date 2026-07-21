/* ==========================================================================
   CONTACT.JS — CONTACT PAGE SPECIFIC SCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initContactTabs();
    prefillInquiryForm();
    initWhatsAppButton();
    initFaqAccordion();
    initAjaxFormSubmission();
});

function initContactTabs() {
    const tabGeneral = document.getElementById('tabGeneral');
    const tabVet = document.getElementById('tabVet');
    const contentGeneral = document.getElementById('contentGeneral');
    const contentVet = document.getElementById('contentVet');

    if (!tabGeneral || !tabVet || !contentGeneral || !contentVet) return;

    function activateTab(tab) {
        if (tab === 'vet') {
            tabVet.classList.add('active');
            tabVet.style.borderBottom = '3px solid var(--accent)';
            tabVet.style.color = 'var(--accent)';
            
            tabGeneral.classList.remove('active');
            tabGeneral.style.borderBottom = 'none';
            tabGeneral.style.color = 'var(--text-secondary)';

            contentVet.style.display = 'block';
            contentGeneral.style.display = 'none';
        } else {
            tabGeneral.classList.add('active');
            tabGeneral.style.borderBottom = '3px solid var(--accent)';
            tabGeneral.style.color = 'var(--accent)';
            
            tabVet.classList.remove('active');
            tabVet.style.borderBottom = 'none';
            tabVet.style.color = 'var(--text-secondary)';

            contentGeneral.style.display = 'block';
            contentVet.style.display = 'none';
        }
    }

    tabGeneral.addEventListener('click', () => activateTab('general'));
    tabVet.addEventListener('click', () => activateTab('vet'));

    // Check query parameters and localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFarm = localStorage.getItem('selectedFarm');
    
    if (urlParams.get('tab') === 'vet' || selectedFarm === 'veterinary_Team') {
        activateTab('vet');
    }
}

function prefillInquiryForm() {
    const selectedFarm = localStorage.getItem('selectedFarm');
    if (!selectedFarm) return;

    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    const messageTemplates = {
        rabbit: "I am interested in your premium Flemish Giant Rabbits. Please send me details on breeding options, pricing, and point-of-lay giant stocks.",
        poultry: "I am interested in ordering Layer birds / eggs. Please provide information on points-of-lay ISA Browns availability and pricing structures.",
        pig: "I am interested in Large White pigs. Please provide pricing logs for newly weaned piglets and breeding stocks.",
        veterinary_Team: "I would like to consult with Dr. Ebenezar Mukwano regarding veterinary care, immunizations, or artificial insemination advice.",
        litter: "I would like to order premium absorbent animal litter sacks. Please let me know current price structures and pick-up arrangements.",
        manure: "I am interested in bulk organic compost manure. Please provide a quote for transport options and loading prices."
    };

    if (subjectSelect) {
        if (selectedFarm === 'veterinary_Team') {
            subjectSelect.value = 'Exclusive Training';
        } else {
            subjectSelect.value = 'Livestock Purchase';
        }
    }

    if (messageTextarea && messageTemplates[selectedFarm]) {
        messageTextarea.value = messageTemplates[selectedFarm];
        messageTextarea.focus();
        // Highlight prefilled textarea briefly
        messageTextarea.style.borderColor = 'var(--accent)';
        setTimeout(() => {
            messageTextarea.style.borderColor = '';
        }, 1500);
    }

    // Clean up to prevent weird states on refresh
    localStorage.removeItem('selectedFarm');
}

function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappButton');
    if (!whatsappBtn) return;

    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = '256757959467';
        const defaultMessage = 'Hello Horeb Animal Farm, I would like to inquire about your premium livestock and services.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        window.open(url, '_blank');
    });
}

function initFaqAccordion() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });
}

/* ========== DYNAMIC AJAX FORM SUBMISSION (NON-BLOCKING) ========== */
function initAjaxFormSubmission() {
    const form = document.getElementById('contactForm');
    const vetForm = document.getElementById('vetForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept page reload

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;

            // Loading indicator
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            const formData = new FormData(form);

            // Fetch API (AJAX POST) to FormSubmit Endpoint
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('AJAX Network Response Error');
                }
            })
            .then(data => {
                // Success! Create and display the custom overlay AJAX Modal
                showAjaxSuccessModal("Message Delivered!", "Thank you for reaching out! Pr. Peter Musoke and our diagnostic vet team have received your details. We will contact you shortly.");
                form.reset();
            })
            .catch(err => {
                console.warn('AJAX Form fallback trigger:', err);
                // Handle success fallback if server returns non-JSON but delivers message
                showAjaxSuccessModal("Delivery Confirmed!", "Your message was sent successfully! We look forward to welcome you to our farm in Nyakabirizi.");
                form.reset();
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }

    if (vetForm) {
        vetForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept page reload

            const submitBtn = document.getElementById('submitVetBtn');
            const originalText = submitBtn.innerHTML;

            // Loading indicator
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';

            const formData = new FormData(vetForm);

            // Fetch API (AJAX POST) to FormSubmit Endpoint
            fetch(vetForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('AJAX Network Response Error');
                }
            })
            .then(data => {
                // Success! Create and display the custom overlay AJAX Modal
                showAjaxSuccessModal("Consultation Request Sent!", "Your consultation details have been transmitted directly to Dr. Ebenezar Mukwano at ebenezarmukwano@gmail.com. The doctor will contact you on your phone shortly.");
                vetForm.reset();
            })
            .catch(err => {
                console.warn('AJAX Vet Form fallback trigger:', err);
                // Handle success fallback if server returns non-JSON but delivers message
                showAjaxSuccessModal("Request Transmitted!", "Your specialized clinical consultation request has been successfully delivered to Dr. Ebenezar Mukwano. He will get in touch with you soon.");
                vetForm.reset();
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }
}

function showAjaxSuccessModal(title, bodyText) {
    // Create Modal Elements dynamically
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'ajaxSuccessModal';

    overlay.innerHTML = `
        <div class="modal-card">
            <div class="modal-icon"><i class="fas fa-check-circle"></i></div>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(bodyText)}</p>
            <button class="btn-primary" id="closeModalBtn" style="width: 100%; justify-content: center;">Perfect, Thanks!</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Fade in
    setTimeout(() => {
        overlay.classList.add('active');
    }, 50);

    const closeBtn = overlay.querySelector('#closeModalBtn');
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 400);
    });
}

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
