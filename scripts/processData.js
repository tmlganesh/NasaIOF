
import fs from 'fs';

// Read the CSV
const csvPath = 'temp_repo/data.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

const lines = csvContent.split('\n').filter(l => l.trim());

const data = {};

// Skip header
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    // Custom CSV parser for this specific format
    let parts = [];
    let current = '';
    let inQuote = false;

    for (let char of line) {
        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            parts.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    parts.push(current.trim());

    if (parts.length < 5) continue;

    const [dateStr, imageName, title, caption, infoUrl, year] = parts;

    // dateStr is like "January 1 2019"
    const dateParts = dateStr.split(' ');
    if (dateParts.length < 2) continue;

    const month = dateParts[0].toLowerCase();
    const day = dateParts[1];

    const cleanCaption = caption ? caption.replace(/^"|"$/g, '').replace(/""/g, '"') : '';

    const id = `${month}-${day}`;

    const BASE_IMAGE_URL = 'https://imagine.gsfc.nasa.gov/hst_bday/images/';

    data[id] = {
        id,
        date: `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}`,
        title: title,
        description: cleanCaption,
        imageUrl: BASE_IMAGE_URL + imageName,
        infoUrl: infoUrl,
        year: year
    };
}

fs.writeFileSync('src/data/hubble_data.json', JSON.stringify(data, null, 2));
console.log(`Processed ${Object.keys(data).length} entries.`);
