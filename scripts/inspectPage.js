
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function run() {
    console.log("Fetching page...");
    const response = await fetch('https://imagine.gsfc.nasa.gov/hst_bday/');
    const text = await response.text();
    console.log("Page fetched. Length:", text.length);

    const $ = cheerio.load(text);

    // Look for scripts that might contain data
    $('script').each((i, el) => {
        const content = $(el).html();
        if (content && content.includes('.jpg') && content.includes('title')) {
            console.log("Found potential data script:");
            console.log(content.substring(0, 500) + "...");
        }
    });

    // Look for iframe or other distinctive elements
    console.log("Iframes:", $('iframe').length);
}

run();
