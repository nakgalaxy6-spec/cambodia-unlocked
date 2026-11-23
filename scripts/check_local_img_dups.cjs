const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const dir = 'public/images';
const files = fs.readdirSync(dir);
const map = new Map();

for (const f of files) {
  const p = path.join(dir, f);
  if (fs.statSync(p).isFile()) {
    const h = getHash(p);
    if (!map.has(h)) map.set(h, []);
    map.get(h).push(f);
  }
}

console.log('--- DUPLICATE FILES IN public/images ---');
let hasDup = false;
for (const [h, list] of map.entries()) {
  if (list.length > 1) {
    console.log(`Duplicate hash ${h.slice(0, 8)}:`, list.join(', '));
    hasDup = true;
  }
}
if (!hasDup) console.log('NO DUPLICATE FILES FOUND IN public/images!');
