const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const start = Date.now();
// console.log(start / 10000000);
// process.env.UV_THREAD_POOL = 2

console.log('the first line of this code');

// ============ timer function ==========
setTimeout(() => console.log('global set time out 1'), 0);
setImmediate(() => console.log('global set immediate 01'));

// ============== process.nextTick function ===============
process.nextTick(() => console.log('global process.nextTick function'));

// ============= crypto function ============
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  console.log(Date.now() - start, 'global password encrypted 01');
});
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  console.log(Date.now() - start, 'global password encrypted 02');
});
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  console.log(Date.now() - start, 'global password encrypted 03');
});

// ============= fs readfile ===========
const filePath = path.join(__dirname, 'textfile.txt');
fs.readFile(filePath, (err, content) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(content.toString());

  // ============== setTimeout & setImmediate function ===============
  setTimeout(() => console.log('set time out 3 (inside fs readfile)'), 0);
  setTimeout(
    () =>
      console.log('set time out 4 (inside fs readfile and 3 seconds after)'),
    3000
  );
  setImmediate(() => console.log('set immediate 02 (inside fs readfile)'));

  // ============== process.nextTick function ===============
  process.nextTick(() =>
    console.log('process.nextTick function (inside fs readfile)')
  );

  // ======== CRYPTO function ==========
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'inside fs reading password encrypted 01');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'inside fs reading password encrypted 02');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'inside fs reading password encrypted 03');
});

console.log('the last line of this code');

