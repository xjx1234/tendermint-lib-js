function compare(arrA, arrB) {
  var min = Math.min(arrA.length, arrB.length);
  for (var i = 0; i < min; i++) {
    if (arrA[i] < arrB[i]) {
      return -1;
    }
    if (arrA[i] > arrB[i]) {
      return 1;
    }
  }
  if (arrA.length < arrB.length) {
    return -1;
  }
  if (arrA.length > arrB.length) {
    return 1;
  }
  return 0;
}

function randInt(max) {
  return Math.floor((Math.random() * max));
}

module.exports = {
  compare: compare,
  randInt: randInt,
  hex: require('./hex'),
  string: require('./string'),
};
