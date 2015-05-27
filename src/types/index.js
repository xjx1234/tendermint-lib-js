function xport(exports, m) {
  for (var key in m) {
    exports[key] = m[key];
  }
}

xport(module.exports, require('./account'));
xport(module.exports, require('./tx'));
