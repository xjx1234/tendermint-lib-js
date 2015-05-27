var client = require('./client');

function getAccount(settings, address, callback) {
  client(settings, {
    method: 'get_account',
    params: [address]
  }, function(err, res) {
    if (err) {
      return callback(err);
    }
    if (!res.Account) {
      return callback(null, null);
    }
    return callback(null, res.Account);
  })
}

module.exports = {
  getAccount: getAccount,
};
