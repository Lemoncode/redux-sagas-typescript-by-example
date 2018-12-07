var currencyDb = require('./currencyDb');
var _ = require('lodash');

const eachXSeconds = 5000;
const getRandomCurrency = (currencyList) => (currencyList[_.random(0, currencyList.length -1)]);

function getRandomNumber(lower, upper) {
  //to create an even sample distribution
  return (lower + (Math.random() * (upper - lower + 1))).toFixed(2);
}


module.exports = (cb) => {
    setInterval(() => {
        currencyDb.find({}, (err, currencyList) => {
            const query = getRandomCurrency(currencyList);
            const change = getRandomNumber(-1, 1);
            const value = {$set: {change}};

            currencyDb.update(query, value);

            const data = {id: query._id, currency: query.currency, change};

            cb(data);
        });
    }, eachXSeconds);
};
