const { execSync } = require('child_process');
const crypto = require('crypto');

function hashBuffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const kulenRemote = execSync('git show origin/main:public/images/phnom-kulen.jpg');
const kbalRemote = execSync('git show origin/main:public/images/kbal-spean.jpg');

console.log('Remote phnom-kulen hash:', hashBuffer(kulenRemote));
console.log('Remote kbal-spean hash:', hashBuffer(kbalRemote));
console.log('Are remote kulen & kbal identical?', hashBuffer(kulenRemote) === hashBuffer(kbalRemote));
