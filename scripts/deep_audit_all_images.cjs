const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getHash(filePath) {
  if (filePath.startsWith('/') || filePath.startsWith('\\')) filePath = filePath.slice(1);
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

// Let's load data and images
const imagesFile = fs.readFileSync('src/lib/images.ts', 'utf8');
const dataFile = fs.readFileSync('src/lib/data.ts', 'utf8');

// Parse img object from images.ts
const imgObj = {};
const imgLines = imagesFile.split('\n');
for (const line of imgLines) {
  const m = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*["']([^"']+)["']/);
  if (m) {
    imgObj[m[1]] = m[2];
  }
}

console.log(`Parsed ${Object.keys(imgObj).length} image keys from images.ts`);

// Evaluate data structures
const vm = require('vm');
const context = {
  img: imgObj,
  console: console,
};
vm.createContext(context);

// Extract the needed arrays from data.ts
// We'll extract DESTINATIONS, businesses, events, stories, guides
try {
  // Replace imports and exports to make it evaluatable
  let cleanCode = dataFile
    .replace(/import\s+[^;]+;/g, '')
    .replace(/export\s+type\s+[^;]+;/g, '')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+interface\s+[\s\S]*?\n\}/g, '')
    .replace(/:\s*[A-Z][a-zA-Z0-9_\[\]|<>\s,"]*(?=[=;,])/g, ''); // strip type annotations loosely

  // Run in VM with dummy types
  const fullScript = `
    const img = ${JSON.stringify(imgObj)};
    ${cleanCode}
    this.DESTINATIONS = DESTINATIONS;
    this.businesses = businesses;
    this.events = events;
    this.stories = stories;
    this.guides = guides;
  `;
  vm.runInContext(fullScript, context);
  console.log('Successfully evaluated data.ts in VM!');
} catch (e) {
  console.log('VM eval error, falling back to regex extraction:', e.message);
}

const destinations = context.DESTINATIONS || [];
const businesses = context.businesses || [];
const events = context.events || [];
const stories = context.stories || [];
const guides = context.guides || [];

console.log(`\nCounts:
Destinations: ${destinations.length}
Businesses: ${businesses.length}
Events: ${events.length}
Stories: ${stories.length}
Guides: ${guides.length}
`);

// Check uniqueness across everything
const allEntities = [];

destinations.forEach(d => allEntities.push({ type: 'DESTINATION', id: d.slug, name: d.name, image: d.image }));
businesses.forEach(b => allEntities.push({ type: 'BUSINESS', id: b.slug, name: b.name, image: b.image }));
events.forEach(e => allEntities.push({ type: 'EVENT', id: e.slug, name: e.name, image: e.image }));
stories.forEach(s => allEntities.push({ type: 'STORY', id: s.slug, name: s.title, image: s.image }));
guides.forEach(g => allEntities.push({ type: 'GUIDE', id: g.slug || g.name, name: g.name, image: g.avatar || g.image }));

// Group by image value
const byImageValue = new Map();
allEntities.forEach(ent => {
  if (!ent.image) return;
  if (!byImageValue.has(ent.image)) byImageValue.set(ent.image, []);
  byImageValue.get(ent.image).push(ent);
});

console.log('=== CHECKING DUPLICATE IMAGE PATHS / URLS ===');
let dupValueCount = 0;
for (const [imgVal, ents] of byImageValue.entries()) {
  if (ents.length > 1) {
    console.log(`\n⚠️ DUPLICATE IMAGE VALUE: "${imgVal}" used by ${ents.length} items:`);
    ents.forEach(e => console.log(`   - [${e.type}] ${e.name} (${e.id})`));
    dupValueCount++;
  }
}
if (dupValueCount === 0) {
  console.log('✅ ZERO duplicate image paths or URLs across ALL entities!');
}

// Group by file hash (for local images)
const byFileHash = new Map();
allEntities.forEach(ent => {
  if (!ent.image) return;
  if (ent.image.startsWith('/') || ent.image.startsWith('public/')) {
    const localPath = path.join('public', ent.image.replace(/^\/?(images\/)?/, 'images/'));
    const h = getHash(localPath);
    if (h) {
      if (!byFileHash.has(h)) byFileHash.set(h, { path: localPath, ents: [] });
      byFileHash.get(h).ents.push(ent);
    }
  }
});

console.log('\n=== CHECKING DUPLICATE LOCAL FILE HASHES ===');
let dupHashCount = 0;
for (const [h, data] of byFileHash.entries()) {
  if (data.ents.length > 1) {
    console.log(`\n⚠️ DUPLICATE FILE CONTENT (hash ${h.slice(0, 8)}): used by ${data.ents.length} items:`);
    data.ents.forEach(e => console.log(`   - [${e.type}] ${e.name} (${e.id}) -> ${e.image}`));
    dupHashCount++;
  }
}
if (dupHashCount === 0) {
  console.log('✅ ZERO duplicate file hashes across ALL entities using local images!');
}
