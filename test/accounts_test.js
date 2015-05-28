var common = require("tendermint-lib").common;
var crypto = require("tendermint-lib").crypto;
var accounts = require("tendermint-lib").accounts;

// Test address generation
var pubKey = "49621D1FB5CF2E5AC3681D1D49E51F534A8BCAF7F57BFF76A027BB73BB570AF6";
var address = accounts.makeAddress([1, pubKey]);
var expected = "BD77B8A1E44BE640D16A62BED5EB1C5B77CE3557";
if (address !== expected) {
  throw "Unexpected address.  Expected "+expected+", got "+address;
}

// Test privAccount generation
var privAccount = accounts.genPrivAccount();
var msgStr = "test message";
var sig = crypto.ed25519.signString(privAccount.privKey, msgStr);
var valid = crypto.ed25519.verifyString(privAccount.pubKey, msgStr, sig);
if (!valid) {
  throw "Signature was invalid."
}

console.log("Accounts tests complete.")
