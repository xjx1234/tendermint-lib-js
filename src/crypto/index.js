var ed25519 = require("./ed25519");
var nacl = require("js-nacl").instantiate();
var hash = require("./hash");
var random = require("./random");

module.exports = {
  ed25519: ed25519,
  nacl: nacl,
  hash: hash,
  random: random,
}
