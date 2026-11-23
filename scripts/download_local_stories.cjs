const https = require('https');
const fs = require('fs');
const path = require('path');

const storiesToDownload = [
  {
    file: 'story-lotus-farm.jpg',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80',
    desc: 'Pink lotus flower pond'
  },
  {
    file: 'story-floating-village.jpg',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    desc: 'Tonle Sap fisherman casting net at sunrise'
  },
  {
    file: 'story-pottery-artisans.jpg',
    url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    desc: 'Hands turning clay on pottery wheel'
  },
  {
    file: 'story-homestay.jpg',
    url: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
    desc: 'Rural village wooden homestay'
  },
  {
    file: 'story-dara-guide.jpg',
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    desc: 'Cambodian smiling guide at ancient stone site'
  },
  {
    file: 'story-kulen-reforestation.jpg',
    url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80',
    desc: 'Lush green mountain forest canopy'
  },
  {
    file: 'story-sokha-tuktuk.jpg',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    desc: 'Scenic palm lined road in Siem Reap countryside'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CambodiaUnlockedApp/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode + ' for ' + url));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(fs.statSync(dest).size);
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const item of storiesToDownload) {
    const dest = path.join('public/images', item.file);
    try {
      const size = await download(item.url, dest);
      console.log(`✓ Saved ${item.file}: ${(size / 1024).toFixed(1)} KB (${item.desc})`);
    } catch (e) {
      console.error(`✗ Error ${item.file}:`, e.message);
    }
  }
  console.log('\nAll story images downloaded locally!');
})();
