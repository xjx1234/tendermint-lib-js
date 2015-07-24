var txTypeSend = 0x01;
var txTypeCall = 0x02;
var txTypeName = 0x03;

var txTypeBond = 0x11;
var txTypeUnbond = 0x12;
var txTypeRebond = 0x13;
var txTypeDupeout = 0x14;

var txTypePermissions = 0x20;

function makeTxInput(address, amount, sequence, signature, pubKey) {
  return {"address":address, "amount":amount, "sequence":sequence, "signature":signature, "pub_key":pubKey};
}

function makeTxOutput(address, amount) {
  return {"address":address, "amount":amount};
}

function makeSendTx(inputs, outputs) {
  return [txTypeSend, {"inputs":inputs, "outputs":outputs}];
}

module.exports = {
  txTypeSend: txTypeSend,
  txTypeCall: txTypeCall,
  txTypeName: txTypeName,

  txTypeBond: txTypeBond,
  txTypeUnbond: txTypeUnbond,
  txTypeRebond: txTypeRebond,
  txTypeDupeout: txTypeDupeout,

  txTypePermissions: txTypePermissions,

  makeTxInput: makeTxInput,
  makeTxOutput: makeTxOutput,
  makeSendTx: makeSendTx,
};
