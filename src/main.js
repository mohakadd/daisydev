import './style.css'
import { content } from './content.js';
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

    // Special handling for Program List (candidate.html)
    const programList = document.getElementById('program-list');
    if (programList && content.candidate.program.items) {
        programList.innerHTML = ''; // Clear existing
        content.candidate.program.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'program-item';
            li.style.borderLeft = `4px solid ${item.color}`;

            const h3 = document.createElement('h3');
            h3.textContent = item.title;

            const p = document.createElement('p');
            p.textContent = item.text;

            li.appendChild(h3);
            li.appendChild(p);
            programList.appendChild(li);
        });
    }
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
});
