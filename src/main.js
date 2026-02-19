import './style.css'
import { content } from './content.js';
import { programmeData } from './programme_data.js';
import { initMap } from './map.js';
import { initCarousel } from './carousel.js';

// Content Injection Logic
function injectContent() {
    const elements = document.querySelectorAll('[data-content]');
    elements.forEach(el => {
        const key = el.getAttribute('data-content');
        const keys = key.split('.');
        let value = content;
        for (const k of keys) {
            if (value && typeof value[k] !== 'undefined') {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }

        if (value !== null && typeof value !== 'undefined') {
            el.textContent = value;
            // remove any previous missing marker
            el.classList.remove('missing-content');
        } else {
            el.classList.add('missing-content');
            console.warn(`Missing content for key: ${key}`, el);
        }
    });
}

function initMosaic() {
    const mosaicContainer = document.getElementById('programme-mosaic');
    if (!mosaicContainer) return;

    // Inject Carousel Structure
    mosaicContainer.innerHTML = `
        <div class="programme-carousel-container">
            <button class="carousel-nav-btn prev"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="programme-track" id="programme-track"></div>
            <button class="carousel-nav-btn next"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    `;

    const track = document.getElementById('programme-track');
    const prevBtn = mosaicContainer.querySelector('.prev');
    const nextBtn = mosaicContainer.querySelector('.next');

    // Render Items
    programmeData.forEach(item => {
        const el = document.createElement('div');
        el.className = 'mosaic-item';
        el.setAttribute('data-id', item.id);
        el.style.borderColor = 'transparent';

        // Hover effect for border color
        el.addEventListener('mouseenter', () => {
            el.style.borderColor = item.color;
        });
        el.addEventListener('mouseleave', () => {
            el.style.borderColor = 'transparent';
        });

        el.innerHTML = `
            <img src="${item.icon}" alt="${item.title}" class="mosaic-icon" onerror="this.src='/images/logo-cergy.webp'; this.style.opacity='0.3'">
        `;

        el.addEventListener('click', () => openModal(item));
        track.appendChild(el);
    });

    // Scroll Logic
    const scrollAmount = 300;
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Modal Logic
    const modal = document.getElementById('programme-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalIcon = document.getElementById('modal-icon');
    const closeBtns = document.querySelectorAll('[data-close]');

    if (!modal) return;

    function openModal(item) {
        modalTitle.textContent = item.title;
        modalTitle.style.color = item.color;
        modalContent.innerHTML = item.content;
        modalIcon.src = item.icon;
        modalIcon.onerror = function () {
            this.src = '/images/logo-cergy.webp';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Countdown Logic
const electionDate = new Date('2026-03-15T08:00:00+01:00');
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    if (!countdownElement) return;

    const now = new Date();
    const diff = electionDate - now;

    if (diff <= 0) {
        countdownElement.textContent = "C'est aujourd'hui !";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    countdownElement.textContent = `${days}j ${hours}h`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    injectContent();
    initMap();
    initCarousel('team-carousel');
    initMosaic();
    // Update countdown every minute (no need to run each second for days/hours)
    setInterval(updateCountdown, 60000);
    updateCountdown();

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');

            // Toggle Icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }
    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', (e) => {
            // Only on mobile or small screens where hover is not primary
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const parent = dropdownToggle.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // If we are on mobile and this link is a dropdown toggle, do not close menu
            if (window.innerWidth <= 900 && link.classList.contains('dropbtn')) {
                return;
            }

            // Close menu
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
});
