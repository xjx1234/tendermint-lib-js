
// Converts an ascii string to a Uint8Array.
function toByteArray(str) {
  var arr = new Uint8Array(str.length);
  for (var i = 0, j = str.length; i < j; ++i) {
    arr[i] = str.charCodeAt(i);
  }
  return arr;
}

module.exports = {
  toByteArray: toByteArray,
};
