var test = require('tape');
var rpc = require('../src/rpc/index.js');
var settings = {
  remotes: [{
    host: 'foo.com',
    port: '1337',
    path: '/'
  }, {
    host: 'bar.io',
    port: '1337',
    path: '/'
  }, {
    host: 'mup.net',
    port: '1337',
    path: '/'
  }]
};

window.XMLHttpRequest = function() {};
window.XMLHttpRequest.prototype.readyState = 4;
window.XMLHttpRequest.prototype.status = 200;
window.XMLHttpRequest.prototype.responseText = JSON.stringify({
  "result": {
    "PrivAccount": {
      "Address": "6ED02F4052394BB157524EDF2E1316C8EF16D8E0",
      "PubKey": [
        1,
        "689761EFF4C15201E4820A040A26D3F4A8692AA634669B305C069591816BF9E7"
      ],
      "PrivKey": [
        1,
        "5516FE94C1B213F2FEB2E5E0BD4FFD44874F0F23353105E2A2A636D6CF2E11A4689761EFF4C15201E4820A040A26D3F4A8692AA634669B305C069591816BF9E7"
      ]
    }
  },
  "error": "",
  "id": "",
  "jsonrpc": "2.0"
});

window.XMLHttpRequest.prototype.open = function (method, url) {
  console.log('xhr open', url);
};

var count = 0;
window.XMLHttpRequest.prototype.send = function () {
  var self = this;
  setTimeout(function () {
    count = count + 1;
    if (count < 2) { // first two requests are bad
      window.XMLHttpRequest.prototype.status = 420;
    } else {
      window.XMLHttpRequest.prototype.status = 200;
    }
    self.onreadystatechange();
    console.log('xhr send');
  }, 100)
}

test('basic', function (t) {
  rpc(settings, {
    method: 'test',
    params: ['foo']
  }, function (err, result) {
    t.error(err);
    t.deepEqual(result, {
		PrivAccount: {
			Address: '6ED02F4052394BB157524EDF2E1316C8EF16D8E0',
			PubKey: [ 1, '689761EFF4C15201E4820A040A26D3F4A8692AA634669B305C069591816BF9E7' ],
			PrivKey: [ 1, '5516FE94C1B213F2FEB2E5E0BD4FFD44874F0F23353105E2A2A636D6CF2E11A4689761EFF4C15201E4820A040A26D3F4A8692AA634669B305C069591816BF9E7' ]
		}
	});
    t.end();
  });
});
