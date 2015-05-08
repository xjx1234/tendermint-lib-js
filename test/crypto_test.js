var crypto = require("tendermint-lib").crypto;
var common = require("tendermint-lib").common;

for (var i=0; i<100; i++) {
  // Make a random length for the randBytes.
  var length = Math.floor(Math.random() * 10);
  var bytes = crypto.random.randBytes(length);
  var encoded = common.hex.encode(bytes);
  var decrypted = common.hex.decode(encoded);
  if (common.compare(bytes, decrypted) != 0) {
    console.log("bytes", bytes);
    console.log("encoded", encoded);
    console.log("decrypted", decrypted);
    throw("Decode(encode(string)) != string");
  }
}

console.log("Crypto tests complete.")
