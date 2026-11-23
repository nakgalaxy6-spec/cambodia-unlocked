const fs = require('fs');

const dataContent = fs.readFileSync('src/lib/data.ts', 'utf8');

function extract(sectionName, startStr, endStr) {
  console.log(`\n=== ${sectionName} ===`);
  const block = dataContent.slice(dataContent.indexOf(startStr), dataContent.indexOf(endStr));
  const lines = block.split('\n');
  let currentSlug = null;
  let currentName = null;
  for (const line of lines) {
    const slugM = line.match(/slug:\s*["']([^"']+)["']/);
    if (slugM) currentSlug = slugM[1];
    const nameM = line.match(/(?:name|title):\s*["']([^"']+)["']/);
    if (nameM && !currentName) currentName = nameM[1];
    const imgM = line.match(/image:\s*([^,\r\n]+)/);
    if (imgM && currentSlug) {
      console.log(`${currentSlug.padEnd(35)} | ${(currentName || '').padEnd(35)} | ${imgM[1].trim()}`);
      currentSlug = null;
      currentName = null;
    }
  }
}

extract('DESTINATIONS', 'export const destinations:', 'export const businesses:');
extract('BUSINESSES', 'export const businesses:', 'export const events:');
extract('EVENTS', 'export const events:', 'export const stories:');
extract('STORIES', 'export const stories:', 'export const homeCategories:');
