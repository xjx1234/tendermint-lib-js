var hexEncodeArray = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
];

/*
function string2Uint8Array(str) {
  var arr = new Uint8Array(str.length);
  for (var i = 0, j = str.length; i < j; ++i) {
    arr[i] = str.charCodeAt(i);
  }
}
*/

function hexEncode(arr) {
  var s = '';
  for (var i = 0; i < arr.length; i++) {
    var code = arr[i];
    s += hexEncodeArray[code >>> 4];
    s += hexEncodeArray[code & 0x0F];
  }
  return s;
}

function decodeChar(ch) {
  var charCode = ch.charCodeAt(0);
  if (48 <= charCode && charCode <= 57) { // 0 - 9
    return charCode - 48;
  }
  if (65 <= charCode && charCode <= 90) { // A - Z
    return charCode - 65 + 10;
  }
  if (97 <= charCode && charCode <= 122) { // a - z
    throw "We do not support lower-case hex";
  }
  throw "Unknown hex character " + ch;
}

function hexDecode(str) {
  if (str.length % 2 !== 0) {
    throw "Cannot hexDecode an odd-length string"
  }
  var arr = new Uint8Array(str.length / 2);
  for (var i = 0; i < arr.length; i++) {
    var charValue1 = decodeChar(str[i * 2]);
    var charValue2 = decodeChar(str[i * 2 + 1]);
    arr[i] = (charValue1 << 4) + charValue2;
  }
  return arr;
}

module.exports = {
  encode: hexEncode,
  decode: hexDecode,
};
