
const fs = require('fs');
const path = require('path');

// Geometry Utilities
function parseWKT(wkt) {
    if (!wkt || !wkt.startsWith('POLYGON')) return null;
    const content = wkt.replace('POLYGON ((', '').replace('))', '');
    const coordPairs = content.split(',');
    return coordPairs.map(pair => {
        const parts = pair.trim().split(' ');
        return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) }; // x=lng, y=lat
    });
}

function getBoundingBox(poly) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of poly) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
    }
    return { minX, minY, maxX, maxY };
}

function boxesOverlap(b1, b2) {
    return !(b2.minX > b1.maxX || b2.maxX < b1.minX || b2.minY > b1.maxY || b2.maxY < b1.minY);
}

// Point in Polygon (Ray Casting)
function isPointInPoly(pt, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i].x, yi = poly[i].y;
        const xj = poly[j].x, yj = poly[j].y;
        const intersect = ((yi > pt.y) !== (yj > pt.y)) &&
            (pt.x < (xj - xi) * (pt.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Line Segment Intersection
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function direction(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return (val > 0) ? 1 : 2;
}

function segmentsIntersect(p1, q1, p2, q2) {
    const d1 = direction(p1, q1, p2);
    const d2 = direction(p1, q1, q2);
    const d3 = direction(p2, q2, p1);
    const d4 = direction(p2, q2, q1);

    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true; // Simple crossing (adjusted for direction logic returning 1/2) - Wait, standard algo is usually d1!=d2 and d3!=d4

    // Better standard version:
    if (d1 !== d2 && d3 !== d4) return true;

    if (d1 === 0 && onSegment(p1, p2, q1)) return true;
    if (d2 === 0 && onSegment(p1, q2, q1)) return true;
    if (d3 === 0 && onSegment(p2, p1, q2)) return true;
    if (d4 === 0 && onSegment(p2, q1, q2)) return true;
    return false;
}

function polygonsOverlap(poly1, poly2) {
    // Check if any point of poly1 is in poly2
    for (const p of poly1) {
        if (isPointInPoly(p, poly2)) return true;
    }
    // Check if any point of poly2 is in poly1
    for (const p of poly2) {
        if (isPointInPoly(p, poly1)) return true;
    }
    // Check if edges intersect
    for (let i = 0; i < poly1.length - 1; i++) {
        for (let j = 0; j < poly2.length - 1; j++) {
            if (segmentsIntersect(poly1[i], poly1[i + 1], poly2[j], poly2[j + 1])) return true;
        }
    }
    return false;
}

// Main logic
const zonesPath = path.join(__dirname, '../src/daisy_zones.js');
const fileContent = fs.readFileSync(zonesPath, 'utf8');

// Primitive extraction of objects since we can't require ES modules easily
const zoneRegex = /\{[\s\S]*?id:\s*(\d+),[\s\S]*?name:\s*"([^"]+)",[\s\S]*?wkt:\s*"([^"]+)"[\s\S]*?\}/g;
let match;
const zones = [];

while ((match = zoneRegex.exec(fileContent)) !== null) {
    zones.push({
        id: parseInt(match[1]),
        name: match[2],
        wkt: match[3],
        poly: parseWKT(match[3])
    });
}

console.log(`Analyzing ${zones.length} zones for overlaps...`);

const overlaps = [];
for (let i = 0; i < zones.length; i++) {
    const z1 = zones[i];
    const b1 = getBoundingBox(z1.poly);

    for (let j = i + 1; j < zones.length; j++) {
        const z2 = zones[j];
        const b2 = getBoundingBox(z2.poly);

        if (boxesOverlap(b1, b2)) {
            // Detailed check
            if (polygonsOverlap(z1.poly, z2.poly)) {
                overlaps.push(`${z1.name} (ID: ${z1.id}) overlaps with ${z2.name} (ID: ${z2.id})`);
            }
        }
    }
}

if (overlaps.length > 0) {
    console.log("Confirmed Overlaps:");
    overlaps.forEach(o => console.log("- " + o));
} else {
    console.log("No overlaps detected.");
}
