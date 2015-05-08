// Cryptographically secure random things.

var nacl = require("js-nacl").instantiate();

function randBytes(len) {
  return nacl.random_bytes(len);
}

module.exports = {
  randBytes: randBytes,
}
