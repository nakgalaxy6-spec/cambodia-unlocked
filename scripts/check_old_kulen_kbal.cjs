const { execSync } = require('child_process');
const crypto = require('crypto');

function hashBuffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const kulenOld = execSync('git show 6ad021b:public/images/phnom-kulen.jpg');
const kbalOld = execSync('git show 6ad021b:public/images/kbal-spean.jpg');

console.log('Old phnom-kulen hash in 6ad021b:', hashBuffer(kulenOld));
console.log('Old kbal-spean hash in 6ad021b:', hashBuffer(kbalOld));
console.log('Were kulen & kbal identical in 6ad021b?', hashBuffer(kulenOld) === hashBuffer(kbalOld));
