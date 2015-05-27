var crypto = require('../crypto');
var hex = require('../common/hex');
var types = require('../types/account');
var binary = require('../binary');

// returns {address, pubKey, privKey}
function genPrivAccount() {
  var keyPair = crypto.ed25519.genKeyPair();
  var address = makeAddress(keyPair[0]);
  return {
    address: address,
    pubKey: keyPair[0],
    privKey: keyPair[1],
  };
}

// pubKey: [pubKeyTypeEd25519, 'pubKeyBytesHex']
// returns 'addressHex'
function makeAddress(pubKey) {
  var buf = new binary.Writer();
  buf.writeUint8(pubKey[0]);
  var pubKeyBytes = hex.decode(pubKey[1]);
  buf.writeByteArray(pubKeyBytes);
  var addrBytes = crypto.hash.ripemd160(buf.getBuffer());
  return hex.encode(addrBytes);
}

module.exports = {
  genPrivAccount: genPrivAccount,
  makeAddress: makeAddress,
}
