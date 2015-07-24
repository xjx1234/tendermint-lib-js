var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:46657/websocket');
var types = require("../src/types");

var acc1 = {
  "address":"A88A61069B6660F30F65E8786AFDD4F1D8F625E9",
  "pub_key":[1,"11227610741CB007DD7E8FEBF812B1B734516AD2C69C9BA0E2FC1B16727B334A"],
  "priv_key":[1,"AC3DFDB516573566377444353C8E15BF87A00A815B4120B7866C3B5F8F97E28911227610741CB007DD7E8FEBF812B1B734516AD2C69C9BA0E2FC1B16727B334A"]
};

var acc2 = {
  "address":"EE2EE9247973B4AFC3867CFE5F415410AC251B61",
  "pub_key":[1,"9E081BDDA61A5F231794BF3E3E2E461DEA46CBB355389B4652A3265800126933"],
  "priv_key":[1,"1E7F56658A574AF447F4933E4D1A88855451B1A7A396EB1D4F821C616D05D1DF9E081BDDA61A5F231794BF3E3E2E461DEA46CBB355389B4652A3265800126933"]
};


function rpcRequest(id, method, params) {
  return JSON.stringify({"jsonrpc":"2.0","id":id,"method":method,"params":params});
}

// NOTE: increments the sequence (nonce) for accSrc.
function makeSendTx(accSrc, accDst, amount) {
  var inputs = [types.makeTxInput(accSrc.address, amount, accSrc.sequence+1, undefined, accSrc.pub_key)];
  var outputs = [types.makeTxOutput(accDst.address, amount)];
  var sendTx = types.makeSendTx(inputs, outputs);
  accSrc.sequence += 1;
  console.log("address:", accSrc.address, "sequence:", accSrc.sequence);
  return sendTx;
}

ws.on('open', function open() {
    ws.send(rpcRequest("acc1get", "get_account", [acc1.address]));
    ws.send(rpcRequest("acc2get", "get_account", [acc2.address]));
    ws.send(rpcRequest("acc1subscribe", "subscribe", ["Acc/"+acc1.address+"/Output"]));
    ws.send(rpcRequest("acc2subscribe", "subscribe", ["Acc/"+acc2.address+"/Output"]));
});

ws.on('message', function(data, flags) {
  var response = JSON.parse(data);
  console.log("received RPC response id:", response.id);

  if (response.error) {
    console.log("received error:", response.error);
    return;
  }

  switch (response.id) {
    case "acc1get":
    case "acc2get":
      if (response.id == "acc1get") {
        acc1.sequence = response.result.sequence;
      } else {
        acc2.sequence = response.result.sequence;
      }
      if (acc1.sequence !== undefined && acc2.sequence !== undefined) {
        var sendTx = makeSendTx(acc1, acc2, 1);
        ws.send(rpcRequest("acc1sign", "unsafe/sign_tx", [sendTx, [acc1]]));
      }
      break;

    case "acc1sign":
    case "acc2sign":
      ws.send(rpcRequest(response.id+"broadcast", "broadcast_tx", [response.result]));
      break;

    case "acc1signbroadcast":
    case "acc2signbroadcast":
      break

    case "acc1subscribe":
    case "acc2subscribe":
      if (response.id == "acc2subscribe") {
        var sendTx = makeSendTx(acc2, acc1, 1);
        ws.send(rpcRequest("acc2sign", "unsafe/sign_tx", [sendTx, [acc2]]));
      } else {
        var sendTx = makeSendTx(acc1, acc2, 1);
        ws.send(rpcRequest("acc1sign", "unsafe/sign_tx", [sendTx, [acc1]]));
      }
      break;

    default:
      console.log("unknown response.id", response.id);
      break;
  }
});
