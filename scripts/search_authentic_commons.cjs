const https = require('https');
const fs = require('fs');
const path = require('path');

// Exact query mapping for each destination
const destinationQueries = [
  { slug: 'angkor-wat', file: 'angkor-wat.jpg', query: 'Angkor Wat reflection lotus pond' },
  { slug: 'bayon-temple', file: 'bayon-temple.jpg', query: 'Bayon face tower Angkor Thom' },
  { slug: 'ta-prohm', file: 'ta-prohm.jpg', query: 'Ta Prohm tree roots stone' },
  { slug: 'banteay-srei', file: 'banteay-srei.jpg', query: 'Banteay Srei devata carving' },
  { slug: 'phnom-bakheng', file: 'phnom-bakheng.jpg', query: 'Angkor Phnom Bakheng temple' },
  { slug: 'preah-khan', file: 'preah-khan.jpg', query: 'Preah Khan Angkor corridor' },
  { slug: 'phnom-kulen', file: 'phnom-kulen.jpg', query: 'Phnom Kulen waterfall' },
  { slug: 'kbal-spean', file: 'kbal-spean.jpg', query: 'Kbal Spean lingas' },
  { slug: 'beng-mealea', file: 'beng-mealea.jpg', query: 'Beng Mealea jungle temple' },
  { slug: 'kampong-phluk-floating-village', file: 'floating-village.jpg', query: 'Kampong Phluk stilt houses' },
  { slug: 'mechrey-floating-village', file: 'mechrey.jpg', query: 'Mechrey floating village' },
  { slug: 'chong-kneas-tonle-sap', file: 'chong-kneas.jpg', query: 'Chong Kneas floating village' },
  { slug: 'bakong-temple-roluos', file: 'bakong.jpg', query: 'Bakong temple pyramid Roluos' },
  { slug: 'chau-srei-vibol', file: 'chau-srei-vibol.jpg', query: 'Chau Srei Vibol' },
  { slug: 'angkor-national-museum', file: 'angkor-museum.jpg', query: 'Siem Reap Museum' },
  { slug: 'pub-street-night-market', file: 'pub-street.jpg', query: 'Pub Street Siem Reap' },
  { slug: 'phare-cambodian-circus', file: 'phare-circus.jpg', query: 'Phare circus Siem Reap' },
  { slug: 'artisans-angkor-silk-farm', file: 'artisans-angkor.jpg', query: 'Artisans Angkor carving' },
  { slug: 'royal-gardens-siem-reap', file: 'royal-gardens.jpg', query: 'Preah Ang Chek Preah Ang Chorm' },
  { slug: 'west-baray', file: 'west-baray.jpg', query: 'West Baray reservoir' },
  { slug: 'pre-rup', file: 'pre-rup.jpg', query: 'Pre Rup temple pyramid' },
  { slug: 'kompong-khleang', file: 'kompong-khleang.jpg', query: 'Kampong Khleang stilt' },
  { slug: 'preah-dak-village', file: 'preah-dak.jpg', query: 'Preah Dak palm sugar' },
  { slug: 'angkor-wat-walkway', file: 'angkor-walkway.jpg', query: 'Angkor Wat causeway bridge' }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CambodiaUnlockedApp/1.0 (contact@cambodiaunlocked.com)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function searchCommons(q) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(q) + '&gsrlimit=5&prop=imageinfo&iiprop=url|size&iiurlwidth=1280&format=json';
  const data = await fetchJson(url);
  if (!data.query || !data.query.pages) return [];
  const results = [];
  for (const p of Object.values(data.query.pages)) {
    if (p.imageinfo && p.imageinfo[0]) {
      const info = p.imageinfo[0];
      const title = p.title.toLowerCase();
      // Skip pdf, djvu, audio, tif, svg
      if (title.endsWith('.pdf') || title.endsWith('.djvu') || title.endsWith('.ogg') || title.endsWith('.svg')) continue;
      results.push({
        title: p.title,
        url: info.thumburl || info.url,
        width: info.thumbwidth || info.width,
        height: info.thumbheight || info.height
      });
    }
  }
  return results;
}

(async () => {
  console.log('--- SEARCHING AUTHENTIC IMAGES ON WIKIMEDIA COMMONS ---');
  for (const t of destinationQueries) {
    const hits = await searchCommons(t.query);
    console.log(`\nQuery: "${t.query}" for ${t.slug} (${t.file})`);
    if (hits.length === 0) {
      console.log('   [NO RESULTS]');
    } else {
      hits.slice(0, 2).forEach((h, i) => {
        console.log(`   [${i + 1}] ${h.title}`);
        console.log(`       URL: ${h.url.slice(0, 90)}...`);
      });
    }
  }
})();
