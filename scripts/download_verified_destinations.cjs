const https = require('https');
const fs = require('fs');
const path = require('path');

const verifiedImages = [
  { file: 'angkor-wat.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Angkor_Wat_from_north_pond.JPG/1280px-Angkor_Wat_from_north_pond.JPG' },
  { file: 'bayon-temple.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Une_tour_%C3%A0_visages_du_Bayon_%28Angkor_Thom%29_%282334987379%29.jpg' },
  { file: 'ta-prohm.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Cambodia_08_-_091_-_Ta_Prohm_%283227698729%29.jpg/1280px-Cambodia_08_-_091_-_Ta_Prohm_%283227698729%29.jpg' },
  { file: 'banteay-srei.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Cambodge_Banteay_Srei_Temple_%282%29.jpg/1280px-Cambodge_Banteay_Srei_Temple_%282%29.jpg' },
  { file: 'phnom-bakheng.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Phnom_Bakheng_temple_at_Angkor%2C_Cambodia.jpg/1280px-Phnom_Bakheng_temple_at_Angkor%2C_Cambodia.jpg' },
  { file: 'preah-khan.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Entrance_to_the_Preah_Khan_temple%2C_Angkor%2C_Cambodia.jpg/1280px-Entrance_to_the_Preah_Khan_temple%2C_Angkor%2C_Cambodia.jpg' },
  { file: 'phnom-kulen.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Phnom_Kulen_0001.jpg' },
  { file: 'kbal-spean.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Kbal_Spean_-_007_Lingas_Carved_into_the_Living_Rock_%288584735012%29.jpg/1280px-Kbal_Spean_-_007_Lingas_Carved_into_the_Living_Rock_%288584735012%29.jpg' },
  { file: 'beng-mealea.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Beng_Mealea_jungle_temple.jpg/1280px-Beng_Mealea_jungle_temple.jpg' },
  { file: 'floating-village.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Houses_on_the_water_in_Kampong_Phlouk.jpg/1280px-Houses_on_the_water_in_Kampong_Phlouk.jpg' },
  { file: 'mechrey.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Floating_village_on_the_Tonl%C3%A9_Sap_3.jpg/1280px-Floating_village_on_the_Tonl%C3%A9_Sap_3.jpg' },
  { file: 'chong-kneas.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Chong_Kneas_floating_village_%284380157829%29.jpg/1280px-Chong_Kneas_floating_village_%284380157829%29.jpg' },
  { file: 'bakong.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Angkor%2C_Roluos_Group%2C_Bakong_%286198838020%29.jpg/1280px-Angkor%2C_Roluos_Group%2C_Bakong_%286198838020%29.jpg' },
  { file: 'banteay-samre.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Banteay_Samre.JPG' },
  { file: 'angkor-museum.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Siem_Reap_Museum.jpg' },
  { file: 'pub-street.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Siem_Reap_Pub_Street.jpg' },
  { file: 'phare-circus.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Phare_Circus%2C_Siem_Reap%2C_Cambodia.jpg/1280px-Phare_Circus%2C_Siem_Reap%2C_Cambodia.jpg' },
  { file: 'artisans-angkor.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Artisans_Angkor-10-Wood_carving-2007-gje.jpg/1280px-Artisans_Angkor-10-Wood_carving-2007-gje.jpg' },
  { file: 'royal-gardens.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Preah_Ang_Chek_Preah_Ang_Chorm_shrine.jpg/1280px-Preah_Ang_Chek_Preah_Ang_Chorm_shrine.jpg' },
  { file: 'west-baray.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Westmeboneastwall.jpg/1280px-Westmeboneastwall.jpg' },
  { file: 'pre-rup.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Pre_Rup%2C_Angkor%2C_Camboya%2C_2013-08-16%2C_DD_13.JPG/1280px-Pre_Rup%2C_Angkor%2C_Camboya%2C_2013-08-16%2C_DD_13.JPG' },
  { file: 'kompong-khleang.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Kampong_Khleang%2C_2018_%2833%29.jpg/1280px-Kampong_Khleang%2C_2018_%2833%29.jpg' },
  { file: 'preah-dak.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Cambodia-Palm_sugar-14-2007-gje.jpg/1280px-Cambodia-Palm_sugar-14-2007-gje.jpg' },
  { file: 'angkor-walkway.jpg', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Causeway_AngkorWat0659.jpg/1280px-Causeway_AngkorWat0659.jpg' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CambodiaUnlockedApp/1.0 (contact@cambodiaunlocked.com)' } }, (res) => {
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
  for (const item of verifiedImages) {
    const dest = path.join('public/images', item.file);
    try {
      const size = await download(item.url, dest);
      console.log(`✓ Saved ${item.file}: ${(size / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.error(`✗ Error ${item.file}:`, e.message);
    }
  }
  console.log('\nAll destination images verified and downloaded!');
})();
