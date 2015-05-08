var rpc = require("tendermint-lib").rpc;
var types = require("tendermint-lib").types;

var host = process.argv[2];
console.log("checking", host);
var remote = {host:host+".chaintest.net", port:46657};

rpc.client(remote, {method:"list_validators"}, function(err, res) {
	console.log(JSON.stringify(res, null, 4), err);
});
