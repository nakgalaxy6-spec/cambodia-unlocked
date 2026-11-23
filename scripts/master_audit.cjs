const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const imgFile = fs.readFileSync('src/lib/images.ts', 'utf8');
const dataFile = fs.readFileSync('src/lib/data.ts', 'utf8');

const imgMap = {};
for (const line of imgFile.split('\n')) {
  const m = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*["']([^"']+)["']/);
  if (m) imgMap[m[1]] = m[2];
}

const blocks = {
  Destinations: dataFile.slice(dataFile.indexOf('export const destinations: Destination[] ='), dataFile.indexOf('export const businessCategories')),
  Businesses: dataFile.slice(dataFile.indexOf('export const businesses: Business[] ='), dataFile.indexOf('export const events: EventItem[] =')),
  Events: dataFile.slice(dataFile.indexOf('export const events: EventItem[] ='), dataFile.indexOf('export const storyCategories')),
  Stories: dataFile.slice(dataFile.indexOf('export const stories: Story[] ='), dataFile.indexOf('export const guides')),
};

function parseEntities(block, type) {
  const res = [];
  // Match slug, name/title, and image
  const regex = /slug:\s*["']([^"']+)["'][\s\S]*?(?:name|title):\s*["']([^"']+)["'][\s\S]*?image:\s*(?:img\.)?([a-zA-Z0-9_]+)/g;
  let match;
  while ((match = regex.exec(block)) !== null) {
    const slug = match[1];
    const name = match[2];
    const imgKey = match[3];
    res.push({
      type,
      slug,
      name,
      imgKey,
      resolved: imgMap[imgKey] || imgKey
    });
  }
  return res;
}

const allItems = [];
for (const [type, block] of Object.entries(blocks)) {
  const list = parseEntities(block, type);
  console.log(`${type}: found ${list.length} entities`);
  allItems.push(...list);
}

console.log(`\nTOTAL entities parsed: ${allItems.length}`);

const byResolved = new Map();
const byHash = new Map();

for (const item of allItems) {
  const r = item.resolved;
  if (!byResolved.has(r)) byResolved.set(r, []);
  byResolved.get(r).push(item);

  if (r && (r.startsWith('/images/') || r.startsWith('images/'))) {
    const fPath = path.join('public', r.replace(/^\/?/, ''));
    if (fs.existsSync(fPath)) {
      const h = crypto.createHash('sha256').update(fs.readFileSync(fPath)).digest('hex');
      if (!byHash.has(h)) byHash.set(h, []);
      byHash.get(h).push({ ...item, fPath });
    } else {
      console.error(`MISSING FILE: ${fPath} for ${item.name}`);
    }
  }
}

console.log('\n--- Checking URL/Path collisions across ALL categories ---');
let hasColl = false;
for (const [url, list] of byResolved.entries()) {
  if (list.length > 1) {
    console.log(`COLLISION: "${url}" shared by:`);
    list.forEach(i => console.log(`   - [${i.type}] ${i.name} (${i.slug})`));
    hasColl = true;
  }
}
if (!hasColl) console.log('✓ ZERO path/URL collisions across ALL entities!');

console.log('\n--- Checking File Hash collisions across ALL categories ---');
let hasHashColl = false;
for (const [h, list] of byHash.entries()) {
  if (list.length > 1) {
    console.log(`HASH COLLISION (${h.slice(0, 8)}) shared by:`);
    list.forEach(i => console.log(`   - [${i.type}] ${i.name} (${i.slug}) [${i.fPath}]`));
    hasHashColl = true;
  }
}
if (!hasHashColl) console.log('✓ ZERO file hash collisions across ALL entities!');
