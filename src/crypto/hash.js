var rmd160 = require('ripemd160');
var nacl = require('js-nacl').appNacl;

// All inputs & outputs are Uint8Arrays.

function ripemd160(bytes) {
  return new Uint8Array(rmd160(bytes));
}

function sha256(bytes) {
  return nacl.crypto_hash_sha256(bytes);
}

module.exports = {
  ripemd160: ripemd160,
  sha256: sha256,
};
