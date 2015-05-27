var crypto = require("tendermint-lib").crypto;
var common = require("tendermint-lib").common;

// Test hex (TODO: move to common)
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

// Test hash
var hashTests = [
  ["ripemd160", "test", "5E52FEE47E6B070565F74372468CDC699DE89107"],
  ["sha256", "test", "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"],
];
hashTests.forEach(function(testcase) {
  var hashFunc = testcase[0];
  var input = testcase[1];
  var output = testcase[2];
  switch(hashFunc) {
  case "ripemd160": hashFunc = crypto.hash.ripemd160; break;
  case "sha256":    hashFunc = crypto.hash.sha256;    break;
  default: throw "Unknown hash function "+hashFunc;
  }
  actual = common.hex.encode(hashFunc(common.string.toByteArray(input)));
  if (actual !== output) {
    throw "Actual hash output did not match expected: "+actual+" vs "+output;
  }
});

console.log("Crypto tests complete.")
