const { execSync } = require('child_process');
const fs = require('fs');

fs.writeFileSync('temp_928293d_kbal.jpg', execSync('git show 928293d:public/images/kbal-spean.jpg'));
fs.writeFileSync('temp_928293d_kulen.jpg', execSync('git show 928293d:public/images/phnom-kulen.jpg'));

console.log('Size of 928293d kbal:', fs.statSync('temp_928293d_kbal.jpg').size);
console.log('Size of 928293d kulen:', fs.statSync('temp_928293d_kulen.jpg').size);
console.log('Are 928293d kbal & kulen identical?', fs.readFileSync('temp_928293d_kbal.jpg').equals(fs.readFileSync('temp_928293d_kulen.jpg')));
