// settings = {
//   host,
//   port,
//   path
// }

// request = {
//   method,
//   params
// }

function clientNode(remote, request, callback) {
  var rpcRequest = formatRequest(request);

  var options = {
    host: remote.host,
    port: remote.port,
    path: remote.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': rpcRequest.length
    }
  };

  var req = require('http').request(options, function(res) {
    var resData = '';
    res.on('data', function(chunk) {
      resData += chunk;
    })
    res.on('end', function() {
      var resJSON = JSON.parse(resData);
      if (resJSON.jsonrpc !== '2.0') {
        return callback(new Error('Response is not jsonrpc 2.0'));
      }
      if (!!resJSON.error) {
        return callback(new Error(resJSON.error));
      }
      return callback(null, resJSON.result);
    })
  })

  req.write(rpcRequest);
  req.end();
}

function clientBrowser(remote, request, callback) {
  var rpcRequest = formatRequest(request);

  var xhr = new window.XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        return callback(new Error('Status is ' + xhr.status));
      }
      var resJSON = JSON.parse(xhr.responseText);
      if (resJSON.jsonrpc !== '2.0') {
        return callback(new Error('Response is not jsonrpc 2.0'));
      }
      if (!!resJSON.error) {
        return callback(new Error(resJSON.error));
      }
      return callback(null, resJSON.result);
    }
  }

  xhr.open('POST', 'http://' + remote.host + ':' + remote.port + remote.path, true);
  xhr.send(rpcRequest);
}

function formatRequest(request) {
  return JSON.stringify({
    jsonrpc: '2.0',
    method: request.method,
    params: request.params,
    id: null
  })
}

module.exports = function(remote, request, callback) {
  // Check if we are in the browser
  if (typeof window === 'undefined') {
    clientNode(remote, request, callback);
  } else {
    clientBrowser(remote, request, callback);
  }
}
