const fs = require('fs');

const dataContent = fs.readFileSync('src/lib/data.ts', 'utf8');
const imagesContent = fs.readFileSync('src/lib/images.ts', 'utf8');

// Parse img object
const imgMap = {};
for (const line of imagesContent.split('\n')) {
  const m = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*["']([^"']+)["']/);
  if (m) imgMap[m[1]] = m[2];
}

const destBlock = dataContent.slice(dataContent.indexOf('export const destinations:'), dataContent.indexOf('export const businesses:'));

// Split by destination objects
const items = destBlock.split(/\{\s*slug:/).slice(1);
console.log(`Found ${items.length} destinations\n`);

items.forEach((item, idx) => {
  const slugM = item.match(/^\s*["']([^"']+)["']/);
  const nameM = item.match(/name:\s*["']([^"']+)["']/);
  const locM = item.match(/location:\s*["']([^"']+)["']/);
  const imgM = item.match(/image:\s*([^,\r\n]+)/);
  const shortM = item.match(/short:\s*["']([^"']+)["']/);

  const slug = slugM ? slugM[1] : '';
  const name = nameM ? nameM[1] : '';
  const loc = locM ? locM[1] : '';
  const rawImg = imgM ? imgM[1].trim() : '';
  const resolvedImg = rawImg.startsWith('img.') ? (imgMap[rawImg.replace('img.', '')] || rawImg) : rawImg;
  const short = shortM ? shortM[1] : '';

  console.log(`${idx + 1}. [${name}] (${slug})`);
  console.log(`   Location: ${loc}`);
  console.log(`   Image: ${rawImg} => ${resolvedImg}`);
  console.log(`   Short: ${short}\n`);
});
