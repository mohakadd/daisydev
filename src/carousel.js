import { map_data } from './map_data.js';
import { focusOnMilitant } from './map.js';

export function initCarousel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Structure:
    // <div class="carousel-container">
    //   <button class="carousel-btn prev" aria-label="Précédent">&lt;</button>
    //   <div class="carousel-track-container">
    //     <ul class="carousel-track">
    //       <!-- items -->
    //     </ul>
    //   </div>
    //   <button class="carousel-btn next" aria-label="Suivant">&gt;</button>
    // </div>

    container.innerHTML = `
        <div class="carousel-main">
            <button class="carousel-btn prev"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-track-container">
                <ul class="carousel-track"></ul>
            </div>
            <button class="carousel-btn next"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    `;

    const track = container.querySelector('.carousel-track');
    const points = map_data.points;

    // Shuffle points randomly so it's not always the same people first? 
    // User didn't ask for random, but it's nice. Let's keep strict order for now unless requested.

    points.forEach((point, index) => {
        if (!point.image) return; // Skip if no image? Or show placeholder? assuming data is good.

        const li = document.createElement('li');
        li.className = 'carousel-slide';
        li.innerHTML = `
            <div class="member-card">
                <div class="member-image">
                    <img src="${point.image}" alt="${point.name}" loading="lazy">
                </div>
                <div class="member-info">
                    <h3>${point.name}</h3>
                    <div class="member-age">${point.age}</div>
                    <div class="member-desc">${point.desc}</div>
                </div>
            </div>
        `;

        li.querySelector('.member-card').addEventListener('click', () => {
            console.log('Clicked militant:', index, point.name);
            focusOnMilitant(index);
        });

        track.appendChild(li);
    });

    // Interaction Logic
    const trackContainer = container.querySelector('.carousel-track-container');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');

    // Scroll amount = card width + gap. 
    // We'll calculate roughly or just scroll by container width / 2

    const scrollAmount = 300; // px

    prevBtn.addEventListener('click', () => {
        trackContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        trackContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}
