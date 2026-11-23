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

// Extract destinations block
const destBlock = dataFile.slice(dataFile.indexOf('export const destinations: Destination[] ='), dataFile.indexOf('export const businessCategories'));
const storyBlock = dataFile.slice(dataFile.indexOf('export const stories'), dataFile.indexOf('export const guides'));

function parseObjects(block, type) {
  const res = [];
  // Match each object block { slug: "...", ... }
  const objRegex = /\{\s*slug:\s*["']([^"']+)["'][\s\S]*?\n\s*\},/g;
  let match;
  while ((match = objRegex.exec(block)) !== null) {
    const objStr = match[0];
    const slug = match[1];
    const nameMatch = objStr.match(/(?:name|title):\s*["']([^"']+)["']/);
    const imgMatch = objStr.match(/image:\s*(?:img\.)?([a-zA-Z0-9_]+)/);
    if (nameMatch && imgMatch) {
      res.push({
        type,
        slug,
        name: nameMatch[1],
        imgKey: imgMatch[1],
        resolved: imgMap[imgMatch[1]] || imgMatch[1]
      });
    }
  }
  return res;
}

const dests = parseObjects(destBlock, 'Destination');
const stories = parseObjects(storyBlock, 'Story');

console.log(`Parsed ${dests.length} Destinations and ${stories.length} Stories.`);

const all = [...dests, ...stories];
const byResolved = new Map();
const byHash = new Map();

for (const item of all) {
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

console.log('\n--- Checking URL/Path collisions ---');
let hasColl = false;
for (const [url, list] of byResolved.entries()) {
  if (list.length > 1) {
    console.log(`COLLISION: "${url}" shared by:`);
    list.forEach(i => console.log(`   - [${i.type}] ${i.name} (${i.slug})`));
    hasColl = true;
  }
}
if (!hasColl) console.log('✓ ZERO path/URL collisions between Destinations and Stories!');

console.log('\n--- Checking File Hash collisions ---');
let hasHashColl = false;
for (const [h, list] of byHash.entries()) {
  if (list.length > 1) {
    console.log(`HASH COLLISION (${h.slice(0, 8)}) shared by:`);
    list.forEach(i => console.log(`   - [${i.type}] ${i.name} (${i.slug}) [${i.fPath}]`));
    hasHashColl = true;
  }
}
if (!hasHashColl) console.log('✓ ZERO file hash collisions between Destinations and Stories!');
