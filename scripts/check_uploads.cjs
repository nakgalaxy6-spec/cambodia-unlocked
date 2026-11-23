const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/Sambath/.gemini/antigravity/brain/4d900409-e9d4-4139-9840-d6ac8d8f4104/.user_uploaded';
if (fs.existsSync(uploadDir)) {
  const files = fs.readdirSync(uploadDir);
  for (const f of files) {
    const p = path.join(uploadDir, f);
    const stat = fs.statSync(p);
    console.log(`${f} - ${stat.size} bytes - ${stat.mtime.toISOString()}`);
  }
}
