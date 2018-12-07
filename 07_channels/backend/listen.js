var currencyDb = require('./currencyDb');

module.exports = function (socket) {
  // Let's listen for the 'currencies' request then answer with a 'currencies'
  // including the whole list
  socket.on('currencies', () => {
    console.log('currencies request');
    currencyDb.find({}, (err, currenciesList) => {
      socket.emit('currencies', currenciesList);
    });
  });
}

