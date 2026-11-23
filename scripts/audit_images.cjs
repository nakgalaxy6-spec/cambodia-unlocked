const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Read files
const imagesContent = fs.readFileSync('src/lib/images.ts', 'utf8');
const dataContent = fs.readFileSync('src/lib/data.ts', 'utf8');
const peopleContent = fs.readFileSync('src/lib/people.ts', 'utf8');

// Parse img object from images.ts
const imgMap = {};
const imgLines = imagesContent.split('\n');
for (const line of imgLines) {
  const m = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*["']([^"']+)["']/);
  if (m) {
    imgMap[m[1]] = m[2];
  }
}

console.log('Total img properties in images.ts:', Object.keys(imgMap).length);

// Get real file hash or URL
function resolveImg(val) {
  if (val.startsWith('img.')) {
    const key = val.replace('img.', '');
    return imgMap[key] || val;
  }
  return val.replace(/['"]/g, '');
}

function getHashOrUrl(resolved) {
  if (resolved.startsWith('http')) return resolved;
  const localPath = path.join('public', resolved.replace(/^\//, ''));
  if (fs.existsSync(localPath)) {
    return 'FILE_MD5:' + crypto.createHash('md5').update(fs.readFileSync(localPath)).digest('hex') + ' (' + resolved + ')';
  }
  return 'LOCAL:' + resolved;
}

// 1. Audit Stories
console.log('\n================ STORIES ================');
const storiesBlock = dataContent.slice(dataContent.indexOf('export const stories:'), dataContent.indexOf('export const homeCategories'));
const storyMatches = storiesBlock.matchAll(/slug:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?image:\s*([^\r\n,]+)/g);
const storyImages = [];
for (const m of storyMatches) {
  const slug = m[1];
  const title = m[2];
  const rawImg = m[3].trim();
  const resolved = resolveImg(rawImg);
  const hash = getHashOrUrl(resolved);
  storyImages.push({ type: 'story', id: slug, title, rawImg, resolved, hash });
  console.log(`Story: ${title} [${slug}] => raw: ${rawImg} => resolved: ${resolved}`);
}

// 2. Audit Destinations
console.log('\n================ DESTINATIONS ================');
const destBlock = dataContent.slice(dataContent.indexOf('export const destinations:'), dataContent.indexOf('export const businesses:'));
const destMatches = destBlock.matchAll(/slug:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?image:\s*([^\r\n,]+)/g);
const destImages = [];
for (const m of destMatches) {
  const slug = m[1];
  const name = m[2];
  const rawImg = m[3].trim();
  const resolved = resolveImg(rawImg);
  const hash = getHashOrUrl(resolved);
  destImages.push({ type: 'destination', id: slug, title: name, rawImg, resolved, hash });
}
console.log(`Total Destinations found: ${destImages.length}`);

// 3. Audit Businesses
console.log('\n================ BUSINESSES ================');
const bizBlock = dataContent.slice(dataContent.indexOf('export const businesses:'), dataContent.indexOf('export const events:'));
const bizMatches = bizBlock.matchAll(/slug:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?image:\s*([^\r\n,]+)/g);
const bizImages = [];
for (const m of bizMatches) {
  const slug = m[1];
  const name = m[2];
  const rawImg = m[3].trim();
  const resolved = resolveImg(rawImg);
  const hash = getHashOrUrl(resolved);
  bizImages.push({ type: 'business', id: slug, title: name, rawImg, resolved, hash });
}
console.log(`Total Businesses found: ${bizImages.length}`);

// 4. Audit Events
console.log('\n================ EVENTS ================');
const evtBlock = dataContent.slice(dataContent.indexOf('export const events:'), dataContent.indexOf('export const stories:'));
const evtMatches = evtBlock.matchAll(/slug:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?image:\s*([^\r\n,]+)/g);
const evtImages = [];
for (const m of evtMatches) {
  const slug = m[1];
  const title = m[2];
  const rawImg = m[3].trim();
  const resolved = resolveImg(rawImg);
  const hash = getHashOrUrl(resolved);
  evtImages.push({ type: 'event', id: slug, title, rawImg, resolved, hash });
  console.log(`Event: ${title} => ${resolved}`);
}

// 5. Audit People
console.log('\n================ PEOPLE ================');
const peopleMatches = peopleContent.matchAll(/id:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?avatar:\s*([^\r\n,]+)/g);
const peopleImages = [];
for (const m of peopleMatches) {
  const id = m[1];
  const name = m[2];
  const rawImg = m[3].trim();
  const resolved = resolveImg(rawImg);
  const hash = getHashOrUrl(resolved);
  peopleImages.push({ type: 'person', id, title: name, rawImg, resolved, hash });
  console.log(`Person: ${name} [${id}] => ${resolved}`);
}

// Check duplicates within each collection and across collections
function findDuplicates(list, label) {
  console.log(`\n--- DUPLICATES WITHIN ${label} ---`);
  const map = {};
  for (const item of list) {
    if (!map[item.hash]) map[item.hash] = [];
    map[item.hash].push(item);
  }
  let count = 0;
  for (const [hash, items] of Object.entries(map)) {
    if (items.length > 1) {
      count++;
      console.log(`DUPLICATE (${items.length} items share ${hash}):`);
      items.forEach(it => console.log(`   - [${it.type}] ${it.title} (${it.id}) => ${it.resolved}`));
    }
  }
  if (count === 0) console.log(`✓ 0 duplicates in ${label}!`);
}

findDuplicates(storyImages, 'STORIES');
findDuplicates(destImages, 'DESTINATIONS');
findDuplicates(bizImages, 'BUSINESSES');
findDuplicates(evtImages, 'EVENTS');
findDuplicates(peopleImages, 'PEOPLE');

const allItems = [...storyImages, ...destImages, ...bizImages, ...evtImages, ...peopleImages];
findDuplicates(allItems, 'ALL COMBINED COLLECTIONS');
