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

function check(fnName, i, expected) {
  // First, write to buffer and check with expected hash
  var w = new binary.Writer();
  w["write"+fnName](i);
  var buf = w.getBuffer();
  var computed = common.hex.encode(buf);
  if (computed !== expected) {
    throw "Expected "+expected+" but got "+computed;
  }
  // Use a reader to read it back into i_
  var r = new binary.Reader(common.hex.decode(computed));
  var i_ = r["read"+fnName]();
  // Use a writer to write ti back into computed_
  var w_ = new binary.Writer();
  w_["write"+fnName](i_);
  var buf_ = w_.getBuffer();
  var computed_ = common.hex.encode(buf_);
  if (computed_ !== expected) {
    throw "Expected "+expected+" upon re-encoding but got "+computed_;
  }
}

check("Uint8", 0x00, "00");
check("Uint8", 0x0F, "0F");
check("Uint8", 0xF0, "F0");
check("Uint8", 0xFF, "FF");
check("Int8", 0x00, "00");
check("Int8", -0x7F, "81");
check("Int8", -0x01, "FF");
check("Uint16", 0x0000, "0000");
check("Uint16", 0x000F, "000F");
check("Uint16", 0xF000, "F000");
check("Uint16", 0xFFFF, "FFFF");
check("Int16", 0x0000, "0000");
check("Int16", -0x7FFF, "8001");
check("Int16", -0x0001, "FFFF");
check("Uint32", 0x00000000, "00000000");
check("Uint32", 0x0000000F, "0000000F");
check("Uint32", 0xF0000000, "F0000000");
check("Uint32", 0xFFFFFFFF, "FFFFFFFF");
check("Int32", 0x00000000, "00000000");
check("Int32", -0x7FFFFFFF, "80000001");
check("Int32", -0x00000001, "FFFFFFFF");
check("Uint64", 0x0000000000000000, "0000000000000000");
check("Uint64", 0x000000000000000F, "000000000000000F");
check("Uint64", 0x0010000000000000, "0010000000000000");
check("Uint64", 0x001FFFFFFFFFFFFF, "001FFFFFFFFFFFFF");
check("Uvarint", 0x00, "0100");
check("Uvarint", 0x0F, "010F");
check("Uvarint", 0xF0, "01F0");
check("Uvarint", 0xFF, "01FF");
check("Uvarint", 0x0000, "0100");
check("Uvarint", 0x000F, "010F");
check("Uvarint", 0xF000, "02F000");
check("Uvarint", 0xFFFF, "02FFFF");
check("Uvarint", 0x00000000, "0100");
check("Uvarint", 0x0000000F, "010F");
check("Uvarint", 0xF0000000, "04F0000000");
check("Uvarint", 0xFFFFFFFF, "04FFFFFFFF");
check("Uvarint", 0x0000000000000000, "0100");
check("Uvarint", 0x000000000000000F, "010F");
check("Uvarint", 0x0010000000000000, "0710000000000000");
check("Uvarint", 0x001FFFFFFFFFFFFF, "071FFFFFFFFFFFFF");
check("ByteArray", common.hex.decode("DEADBEEF"), "0104DEADBEEF");

console.log("Binary tests complete.");
