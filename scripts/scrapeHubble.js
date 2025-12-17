
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

async function scrapeDate(month, day) {
    const url = `https://imagine.gsfc.nasa.gov/hst_bday/${month}/${day}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.status}`);
            return null;
        }
        const text = await response.text();
        const $ = cheerio.load(text);

        // Structure analysis based on "See Full Image" link or background image
        // Usually these sites have an <img> tag or a background style.
        // Let's look for the main image.

        let imageUrl = '';
        let title = '';
        let description = '';

        // Try to find the image in a specific container
        // Based on typical NASA styling, might be in a div with class 'image-container' or similar.
        // But since I can't see the DOM, I'll look for *any* large image or the 'og:image' meta tag first.

        const ogImage = $('meta[property="og:image"]').attr('content');
        if (ogImage) {
            imageUrl = ogImage;
        }

        // Fallback: finding the main display image
        if (!imageUrl) {
            imageUrl = $('.img-responsive').first().attr('src') || $('img').first().attr('src');
        }

        // Title and description
        // Often in a specific block.
        title = $('h1').text().trim() || $('h2').text().trim();
        // Description
        description = $('.description').text().trim() || $('p').first().text().trim();

        console.log(`Scraped ${month} ${day}: ${title} - ${imageUrl}`);

        return {
            date: `${month} ${day}`,
            imageUrl,
            title,
            description,
            infoUrl: url
        };

    } catch (e) {
        console.error(`Error scraping ${month} ${day}:`, e);
        return null;
    }
}

async function run() {
    const results = [];
    // Test with just one date first
    const test = await scrapeDate('may', '28');
    if (test) results.push(test);

    // Save to test file
    fs.writeFileSync('src/data/hubble_data_test.json', JSON.stringify(results, null, 2));
    console.log("Saved test data");
}

run();
