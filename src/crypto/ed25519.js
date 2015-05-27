var nacl = require('js-nacl').appNacl;
var hash = require('./hash');
var hex = require('../common/hex');
var types = require('../types/account');

//--------------------------------------------------------------------------------

// pubKey: [pubKeyTypeEd25519, 'pubKeyBytesHex']
function verifyString(pubKey, msgStr, sig) {
  if (pubKey[0] !== types.pubKeyTypeEd25519) {
    throw 'Unexpected pubKey type ' + pubKey[0];
  }
  var msgBytes = nacl.encode_utf8(msgStr);
  var pubKeyBytes = hex.decode(pubKey[1]);
  var verify = nacl.crypto_sign_verify_detached(sig.bytes, msgBytes, pubKeyBytes);
  return verify;
}

// privKey: [privKeyTypeEd25519, 'privKeyBytesHex']
// returns [signatureTypeEd25519, 'sigBytesHex']
function signString(privKey, msgStr) {
  if (privKey[0] !== types.privKeyTypeEd25519) {
    throw 'Unexpected privKey type ' + privKey[0];
  }
  var signBytes = nacl.encode_utf8(msgStr);
  var privKeyBytes = hex.decode(privKey[1]);
  var sigBytes = nacl.crypto_sign_detached(signBytes, privKeyBytes);
  var sig = new SignatureEd25519(sigBytes);
  return [types.signatureTypeEd25519, hex.encode(sig)];
}

// returns [[pubKeyTypeEd25519, 'pubKeyBytesHex'],
//          [privKeyTypeEd25519, 'privKeyBytesHex']]
function genKeyPair() {
  var keypair = nacl.crypto_sign_keypair();
  var privKeyBytes = keypair.signSk;
  var pubKeyBytes = keypair.signPk;
  return [[types.pubKeyTypeEd25519, pubKeyBytes],
          [types.privKeyTypeEd25519, privKeyBytes]];
}

module.exports = {
  verifyString: verifyString,
  signString: signString,
  genKeyPair: genKeyPair,
};
