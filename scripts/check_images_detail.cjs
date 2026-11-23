const fs = require('fs');

const dataContent = fs.readFileSync('src/lib/data.ts', 'utf8');
const imagesContent = fs.readFileSync('src/lib/images.ts', 'utf8');

console.log('--- DESTINATIONS kbal-spean & phnom-kulen ---');
const kbalMatch = dataContent.match(/id:\s*['"]kbal-spean['"][\s\S]*?image:\s*([a-zA-Z0-9_]+)/);
const kulenMatch = dataContent.match(/id:\s*['"]phnom-kulen['"][\s\S]*?image:\s*([a-zA-Z0-9_]+)/);
console.log('kbal-spean image var:', kbalMatch ? kbalMatch[1] : 'not found');
console.log('phnom-kulen image var:', kulenMatch ? kulenMatch[1] : 'not found');

if (kbalMatch) {
  const regKbal = new RegExp(`export const ${kbalMatch[1]}\\s*=\\s*['"]([^'"]+)['"]`);
  const m = imagesContent.match(regKbal);
  console.log(`${kbalMatch[1]} maps to:`, m ? m[1] : 'not found');
}
if (kulenMatch) {
  const regKulen = new RegExp(`export const ${kulenMatch[1]}\\s*=\\s*['"]([^'"]+)['"]`);
  const m = imagesContent.match(regKulen);
  console.log(`${kulenMatch[1]} maps to:`, m ? m[1] : 'not found');
}

console.log('\n--- STORIES: Lotus Farm & Floating Village Fishers ---');
const lotusMatch = dataContent.match(/id:\s*['"]story-lotus-farm['"][\s\S]*?image:\s*([a-zA-Z0-9_]+)/);
const floatMatch = dataContent.match(/id:\s*['"]story-floating-village['"][\s\S]*?image:\s*([a-zA-Z0-9_]+)/);
console.log('story-lotus-farm image var:', lotusMatch ? lotusMatch[1] : 'not found');
console.log('story-floating-village image var:', floatMatch ? floatMatch[1] : 'not found');

if (lotusMatch) {
  const regLotus = new RegExp(`export const ${lotusMatch[1]}\\s*=\\s*['"]([^'"]+)['"]`);
  const m = imagesContent.match(regLotus);
  console.log(`${lotusMatch[1]} maps to:`, m ? m[1] : 'not found');
}
if (floatMatch) {
  const regFloat = new RegExp(`export const ${floatMatch[1]}\\s*=\\s*['"]([^'"]+)['"]`);
  const m = imagesContent.match(regFloat);
  console.log(`${floatMatch[1]} maps to:`, m ? m[1] : 'not found');
}
