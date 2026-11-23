const fs = require('fs');

const dataContent = fs.readFileSync('src/lib/data.ts', 'utf8');

const lines = dataContent.split('\n');
console.log('--- Lines with Kulen or Kbal Spean ---');
lines.forEach((line, i) => {
  if (/kulen|kbal/i.test(line)) {
    console.log(`${i+1}: ${line}`);
    for (let j = Math.max(0, i-2); j <= Math.min(lines.length-1, i+6); j++) {
      console.log(`  ${j+1}: ${lines[j]}`);
    }
  }
});

console.log('--- Lines with Lotus or Floating in STORIES ---');
lines.forEach((line, i) => {
  if (/Lotus|Floating/i.test(line)) {
    console.log(`${i+1}: ${line}`);
    for (let j = Math.max(0, i-2); j <= Math.min(lines.length-1, i+6); j++) {
      console.log(`  ${j+1}: ${lines[j]}`);
    }
  }
});
