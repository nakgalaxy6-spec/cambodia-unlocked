const fs = require('fs');
const crypto = require('crypto');

function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const userBg = 'C:/Users/Sambath/.gemini/antigravity/brain/4d900409-e9d4-4139-9840-d6ac8d8f4104/.user_uploaded/media_1795439454024_06a3134d.jpg';
const hero = 'public/images/hero-angkor.jpg';

console.log('User uploaded background hash:', hash(userBg));
console.log('public/images/hero-angkor.jpg hash:', hash(hero));
console.log('Matches:', hash(userBg) === hash(hero));
