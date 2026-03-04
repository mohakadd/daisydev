import { colistiersData } from './colistiers_data.js';

// State for active filters
let activeFilters = new Set(colistiersData.quartiersOrder);

export function renderColistiers() {
    const container = document.getElementById('colistiers-list-container');
    if (!container) return;

    // We only want to inject the filter UI once to avoid losing state or recreating DOM unnecessarily
    if (!document.getElementById('colistiers-filter-bar')) {
        // Initial setup encompassing the title, filter bar, and the wrapper for cards
        let initialHtml = '<h2 class="section-title" style="text-align: center; margin-bottom: 2rem;">L\'équipe par quartier</h2>';

        // Filter UI
        initialHtml += `
            <div id="colistiers-filter-bar" style="display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; margin-bottom: 3rem; padding: 0 1rem;">
            </div>
            <div id="colistiers-cards-wrapper"></div>
        `;
        container.innerHTML = initialHtml;

        renderFilterBar();
    }

    renderCards();
}

function renderFilterBar() {
    const filterBar = document.getElementById('colistiers-filter-bar');
    if (!filterBar) return;

    let filterHtml = '';

    // Add "Tous" button
    const allSelected = activeFilters.size === colistiersData.quartiersOrder.length;
    filterHtml += `
        <button class="filter-btn filter-btn-all ${allSelected ? 'active' : ''}" 
            style="padding: 0.6rem 1.2rem; border-radius: 50px; border: 2px solid var(--color-purple); background: ${allSelected ? 'var(--color-purple)' : 'white'}; color: ${allSelected ? 'white' : 'var(--color-purple)'}; font-weight: bold; cursor: pointer; transition: all 0.2s;"
            data-filter="all">
            Tous les quartiers
        </button>
    `;

    // Add individual quartier buttons
    colistiersData.quartiersOrder.forEach(quartier => {
        const color = colistiersData.colors[quartier];
        const isSelected = activeFilters.has(quartier);
        let qFormatted = formatQuartierName(quartier);

        filterHtml += `
            <button class="filter-btn" 
                style="padding: 0.6rem 1.2rem; border-radius: 50px; border: 2px solid ${color}; background: ${isSelected ? color : 'white'}; color: ${isSelected ? 'white' : color}; font-weight: bold; cursor: pointer; transition: all 0.2s;"
                data-filter="${quartier}" data-color="${color}">
                ${qFormatted}
            </button>
        `;
    });

    filterBar.innerHTML = filterHtml;

    // Attach event listeners
    const buttons = filterBar.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');

            if (filter === 'all') {
                activeFilters = new Set(colistiersData.quartiersOrder);
            } else {
                // If currently "all" are selected, an initial click on a neighborhood should isolate it
                if (activeFilters.size === colistiersData.quartiersOrder.length) {
                    activeFilters.clear();
                    activeFilters.add(filter);
                } else if (activeFilters.has(filter)) {
                    // Standard toggle off
                    activeFilters.delete(filter);
                    // If everything is unselected, fallback to all
                    if (activeFilters.size === 0) {
                        activeFilters = new Set(colistiersData.quartiersOrder);
                    }
                } else {
                    // Standard toggle on
                    activeFilters.add(filter);
                }
            }
            // Re-render
            renderFilterBar();
            renderCards();
        });
    });
}

function formatQuartierName(quartier) {
    let qFormatted = quartier.toLowerCase().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ').replace("'Oise", "'Oise").replace("-De-", "-de-");

    if (quartier === "ORÉE DU BOIS") qFormatted = "Orée du Bois";
    if (quartier === "GRAND CENTRE") qFormatted = "Grand Centre";
    if (quartier === "AXE MAJEUR") qFormatted = "Axe Majeur";
    if (quartier === "HAUTS-DE-CERGY") qFormatted = "Hauts-de-Cergy";

    return qFormatted;
}

function renderCards() {
    const wrapper = document.getElementById('colistiers-cards-wrapper');
    if (!wrapper) return;

    let html = '';

    // Group members by quartier
    const groupedMembers = {};
    colistiersData.quartiersOrder.forEach(q => groupedMembers[q] = []);

    colistiersData.members.forEach(member => {
        if (groupedMembers[member.quartier]) {
            groupedMembers[member.quartier].push(member);
        }
    });

    // Generate HTML for each quartier that is ACTIVE in the filter
    let visibleCount = 0;

    colistiersData.quartiersOrder.forEach(quartier => {
        if (!activeFilters.has(quartier)) return; // Skip if filtered out

        const members = groupedMembers[quartier];
        if (!members || members.length === 0) return;

        visibleCount++;
        const color = colistiersData.colors[quartier];
        let qFormatted = formatQuartierName(quartier);

        html += `
            <div class="quartier-section slide-in-bottom">
                <h3 style="color: ${color}; border-bottom: 3px solid ${color}; padding-bottom: 0.5rem; margin-top: 2rem; font-size: 1.8rem; display: flex; justify-content: space-between; align-items: baseline;">
                    <span>${qFormatted}</span>
                    <span class="mobile-scroll-hint" style="color: ${color}; opacity: 0.7;">Glissez <i class="fa-solid fa-arrow-right-long"></i></span>
                </h3>
                <div class="colistiers-grid">
        `;

        members.forEach(member => {
            const descriptionHtml = member.description
                ? `<p style="font-size: 0.9rem; margin-top: 0.5rem; color: #555; line-height: 1.4;">${member.description}</p>`
                : '';

            html += `
                <div class="colistier-card" style="border-top: 5px solid ${color}; background: white; padding: 1.5rem; text-align: center; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); display: flex; flex-direction: column; align-items: center;">
                    <img src="/images/coli/${member.photo}" onerror="this.src='/images/logo-cergy.webp'" alt="${member['nom prenom']}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 3px solid ${color}; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h4 style="margin: 0; font-size: 1.25rem; color: #222;">${member['nom prenom']}</h4>
                    <p style="font-weight: bold; color: ${color}; margin: 0.5rem 0 0.25rem 0; font-size: 0.95rem;">${member.age} - ${member.metier}</p>
                    ${descriptionHtml}
                </div>
            `;
        });

        html += `</div></div>`;
    });

    if (visibleCount === 0) {
        html = `<p style="text-align: center; padding: 3rem; font-size: 1.2rem; color: #777;">Aucun colistier ne correspond à votre sélection.</p>`;
    }

    wrapper.innerHTML = html;
}
