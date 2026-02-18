import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { content } from './content.js';

export function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Define icons to use local or CDN images to avoid missing asset issues with Vite/Leaflet
    const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

    const DefaultIcon = L.icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconRetinaUrl,
        shadowUrl: shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    // Initialize map centered on Cergy
    const map = L.map('map').setView([49.04540322199032, 2.052485189497857], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add markers from content
    if (content.map_data && content.map_data.points) {
        content.map_data.points.forEach((point, index) => {
            const popupContent = `
                <div class="map-popup">
                    <img src="${point.image}" alt="${point.name}" class="popup-img">
                    <div class="popup-text">
                        <h3>${point.name}</h3>
                        <p class="popup-age">${point.age}</p>
                        <p class="popup-desc">${point.desc}</p>
                    </div>
                </div>
            `;
            const marker = L.marker([point.lat, point.lng])
                .addTo(map)
                .bindPopup(popupContent);

            // Store reference/index if needed, or we control by index from carousel
            markers.push(marker);
        });
    }


    // Add zones from map_data
    if (content.map_data && content.map_data.zones) {
        content.map_data.zones.forEach(zone => {
            const latLngs = parseWKT(zone.wkt);
            if (latLngs && latLngs.length > 0) {
                // Static Style - Display all by default with colors
                L.polygon(latLngs, {
                    color: zone.color,
                    fillColor: zone.color,
                    fillOpacity: 0.5,
                    weight: 2
                })
                    .addTo(map)
                    .bindTooltip(zone.name, {
                        permanent: false,
                        direction: 'center',
                        className: 'zone-tooltip'
                    });
            }
        });
    }
}

function parseWKT(wkt) {
    if (!wkt || !wkt.startsWith('POLYGON')) return null;

    // Remove "POLYGON ((" and "))" and split by ","
    const content = wkt.replace('POLYGON ((', '').replace('))', '');
    const coordPairs = content.split(',');

    const latLngs = [];
    coordPairs.forEach(pair => {
        const parts = pair.trim().split(' ');
        if (parts.length === 2) {
            const lng = parseFloat(parts[0]);
            const lat = parseFloat(parts[1]);
            if (!isNaN(lat) && !isNaN(lng)) {
                latLngs.push([lat, lng]); // Leaflet expects [Lat, Lng]
            }
        }
    });

    return latLngs;
}

const markers = [];
let mapInstance = null; // if needed to scroll to top

export function focusOnMilitant(index) {
    if (index >= 0 && index < markers.length) {
        const marker = markers[index];
        const map = marker._map; // Leaflet markers have _map reference when added
        if (map) {
            // Scroll to map
            document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });

            // Center map and open popup
            map.flyTo(marker.getLatLng(), 15, {
                animate: true,
                duration: 1.5
            });

            // Wait slightly for scroll before opening popup if desired, or open immediately
            marker.openPopup();
        }
    }
}
