import { colistiersData } from './colistiers_data.js';

export function renderColistiers() {
    const container = document.getElementById('colistiers-list-container');
    if (!container) return;

    // Build the "L'équipe par quartier" section
    let html = '<h2 class="section-title" style="text-align: center; margin-bottom: 3rem;">L\'équipe par quartier</h2>';

    // Group members by quartier
    const groupedMembers = {};
    colistiersData.quartiersOrder.forEach(q => groupedMembers[q] = []);

    colistiersData.members.forEach(member => {
        if (groupedMembers[member.quartier]) {
            groupedMembers[member.quartier].append; // oops, push
            groupedMembers[member.quartier].push(member);
        }
    });

    // Generate HTML for each quartier
    colistiersData.quartiersOrder.forEach(quartier => {
        const members = groupedMembers[quartier];
        if (!members || members.length === 0) return;

        const color = colistiersData.colors[quartier];

        // Format quartier name properly
        let qFormatted = quartier.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ').replace("'Oise", "'Oise").replace("-De-", "-de-");

        if (quartier === "ORÉE DU BOIS") qFormatted = "Orée du Bois";
        if (quartier === "GRAND CENTRE") qFormatted = "Grand Centre";
        if (quartier === "AXE MAJEUR") qFormatted = "Axe Majeur";
        if (quartier === "HAUTS-DE-CERGY") qFormatted = "Hauts-de-Cergy";

        html += `
            <h3 style="color: ${color}; border-bottom: 3px solid ${color}; padding-bottom: 0.5rem; margin-top: 3rem; font-size: 1.8rem;">${qFormatted}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin-top: 2rem;">
        `;

        members.forEach(member => {
            const descriptionHtml = member.description
                ? `<p style="font-size: 0.9rem; margin-top: 0.5rem; color: #555; line-height: 1.4;">${member.description}</p>`
                : '';

            html += `
                <div class="colistier-card" style="border-top: 5px solid ${color}; background: white; padding: 1.5rem; text-align: center; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); display: flex; flex-direction: column; align-items: center;">
                    <img src="/images/coli/${member.photo}" alt="${member['nom prenom']}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 3px solid ${color}; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h4 style="margin: 0; font-size: 1.25rem; color: #222;">${member['nom prenom']}</h4>
                    <p style="font-weight: bold; color: ${color}; margin: 0.5rem 0 0.25rem 0; font-size: 0.95rem;">${member.age} - ${member.metier}</p>
                    ${descriptionHtml}
                </div>
            `;
        });

        html += `</div>`;
    });

    container.innerHTML = html;
}
