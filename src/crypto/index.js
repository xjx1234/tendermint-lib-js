// Initialize a global nacl instance and cache it in require('js-nacl')
var nacl = require('js-nacl').instantiate();
require('js-nacl').appNacl = nacl;

var ed25519 = require('./ed25519');
var hash = require('./hash');
var random = require('./random');

module.exports = {
  ed25519: ed25519,
  nacl: nacl,
  hash: hash,
  random: random,
}
