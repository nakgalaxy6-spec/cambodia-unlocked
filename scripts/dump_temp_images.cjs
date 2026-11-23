const { execSync } = require('child_process');
const fs = require('fs');

fs.writeFileSync('temp_c0767a0_kbal.jpg', execSync('git show c0767a0:public/images/kbal-spean.jpg'));
fs.writeFileSync('temp_c0767a0_kulen.jpg', execSync('git show c0767a0:public/images/phnom-kulen.jpg'));

console.log('Size of temp_c0767a0_kbal.jpg:', fs.statSync('temp_c0767a0_kbal.jpg').size);
console.log('Size of temp_c0767a0_kulen.jpg:', fs.statSync('temp_c0767a0_kulen.jpg').size);
