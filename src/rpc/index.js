module.exports = {
  client: require('./client'),
}

// For convenience, just export all the rpc into a flat namespace in 'rpc'.

function xport(exports, m) {
  for (var key in m) {
    exports[key] = m[key];
  }
}

xport(module.exports, require('./account'));
