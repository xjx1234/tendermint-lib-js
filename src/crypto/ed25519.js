var nacl = require("js-nacl").instantiate();
var hash = require("./hash");
var hex = require("../common/hex");
var types = require("../types/account");

//--------------------------------------------------------------------------------

// pubKey: [pubKeyTypeEd25519, "pubKeyBytesInHex"]
function verifyStringEd25519(pubKey, msgStr, sig) {
  if (pubKey[0] !== types.pubKeyTypeEd25519) {
    throw "Unexpected pubKey type " + pubKey[0];
  }
  var msgBytes = nacl.encode_utf8(msgStr);
  var pubKeyBytes = hex.decode(pubKey[1]);
  var verify = nacl.crypto_sign_verify_detached(sig.bytes, msgBytes, pubKeyBytes);
  return verify;
}

function makeAddressEd25519(pubKey) {
  var arr = Uint8Array();
  var pubKeyBytes = hex.decode(pubKey[1]);
  var buf = new binary.Writer();
  buf.writeUint8(types.pubKeyTypeEd25519);
  buf.writeUvarint(pubKeyBytes.length);
  buf.writeBytes(pubKeyBytes);
  // XXX continue developing below
  // return hash.ripemd160(this.bytes);
  return "makeAddressEd25519 not implemented";
}

/*
function genPrivKeyEd25519() {
  var keypair = nacl.crypto_sign_keypair();
  var privKeyBytes = keypair.signSk;
  //var pubKeyBytes = keypair.signPk;
  return new PrivKeyEd25519(privKeyBytes);
}
*/

/*
PrivKeyEd25519.prototype.signString = function(msgStr) {
  var signBytes = nacl.encode_utf8(msgStr);
  var sigBytes = nacl.crypto_sign_detached(signBytes, this.bytes);
  var sig = new SignatureEd25519(sigBytes);
  return sig
}
*/

/*
PrivKeyEd25519.prototype.makePubKey = function() {
  if (this.bytes.length != 64) {
    throw "Cannot makePubKey: Invalid PrivKeyEd25519 bytes"
  }
  return new PubKeyEd25519(this.bytes.subarray(32, 64));
}
*/

