var binary = require("tendermint-lib").binary;
var common = require("tendermint-lib").common;

// Test int8
for (var i=-0x7F; i<0x7F; i+=1) {
  var w = new binary.Writer();
  w.writeInt8(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readInt8();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

// Test uint8
for (var i=0; i<0xFF; i+=1) {
  var w = new binary.Writer();
  w.writeUint8(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readUint8();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

// Test int16
for (var i=0x7FFF; i<0x7FFF; i+=123) {
  var w = new binary.Writer();
  w.writeInt16(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readInt16();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

// Test uint16
for (var i=0; i<0xFFFF; i+=123) {
  var w = new binary.Writer();
  w.writeUint16(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readUint16();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

// Test int32
for (var i=0x7FFFFFFF; i<0x7FFFFFFF; i+=123457) {
  var w = new binary.Writer();
  w.writeInt32(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readInt32();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

// Test uint32
for (var i=0; i<0xFFFFFFFF; i+=123457) {
  var w = new binary.Writer();
  w.writeUint32(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readUint32();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

// Test uint64
for (var i=0; i<0x01FFFFFFFF; i+=123457) {
  var w = new binary.Writer();
  w.writeUint64(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readUint64();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

// Test uvarint
for (var i=0; i<0x01FFFFFFFF; i+=123457) {
  var w = new binary.Writer();
  w.writeUvarint(i);
  var buf = w.getBuffer();
  // console.log(common.hex.encode(buf));
  var r = new binary.Reader(buf);
  var i_ = r.readUvarint();
  if (i !== i_) {
    throw "Encoded "+i+" and got "+i_;
  }
}

function check(fnName, i, hex) {
  var w = new binary.Writer();
  w[fnName](i);
  var buf = w.getBuffer();
  var computed = common.hex.encode(buf);
  if (computed !== hex) {
    throw "Expected "+hex+" but got "+computed;
  }
}

check("writeUint8", 0x00, "00");
check("writeUint8", 0x0F, "0F");
check("writeUint8", 0xF0, "F0");
check("writeUint8", 0xFF, "FF");
check("writeInt8", 0x00, "00");
check("writeInt8", -0x7F, "81");
check("writeInt8", -0x01, "FF");
check("writeUint16", 0x0000, "0000");
check("writeUint16", 0x000F, "000F");
check("writeUint16", 0xF000, "F000");
check("writeUint16", 0xFFFF, "FFFF");
check("writeInt16", 0x0000, "0000");
check("writeInt16", -0x7FFF, "8001");
check("writeInt16", -0x0001, "FFFF");
check("writeUint32", 0x00000000, "00000000");
check("writeUint32", 0x0000000F, "0000000F");
check("writeUint32", 0xF0000000, "F0000000");
check("writeUint32", 0xFFFFFFFF, "FFFFFFFF");
check("writeInt32", 0x00000000, "00000000");
check("writeInt32", -0x7FFFFFFF, "80000001");
check("writeInt32", -0x00000001, "FFFFFFFF");
check("writeUint64", 0x0000000000000000, "0000000000000000");
check("writeUint64", 0x000000000000000F, "000000000000000F");
check("writeUint64", 0x0010000000000000, "0010000000000000");
check("writeUint64", 0x001FFFFFFFFFFFFF, "001FFFFFFFFFFFFF");
check("writeUvarint", 0x00, "0100");
check("writeUvarint", 0x0F, "010F");
check("writeUvarint", 0xF0, "01F0");
check("writeUvarint", 0xFF, "01FF");
check("writeUvarint", 0x0000, "0100");
check("writeUvarint", 0x000F, "010F");
check("writeUvarint", 0xF000, "02F000");
check("writeUvarint", 0xFFFF, "02FFFF");
check("writeUvarint", 0x00000000, "0100");
check("writeUvarint", 0x0000000F, "010F");
check("writeUvarint", 0xF0000000, "04F0000000");
check("writeUvarint", 0xFFFFFFFF, "04FFFFFFFF");
check("writeUvarint", 0x0000000000000000, "0100");
check("writeUvarint", 0x000000000000000F, "010F");
check("writeUvarint", 0x0010000000000000, "0710000000000000");
check("writeUvarint", 0x001FFFFFFFFFFFFF, "071FFFFFFFFFFFFF");
