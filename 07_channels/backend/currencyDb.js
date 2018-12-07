const Datastore = require('nedb');
const _  = require('lodash/fp');

const currencies = [
    {
      _id: "1",   
      currency: "Euro", 
      change: 0.17, 
    },    
    {
      _id: "2",   
      currency: "US Dollar", 
      change: 0.14
    },
    {
      _id: "3",   
      currency: "British Pound", 
      change: -0.03      
    },    
];

const currenciesDb = new Datastore({inMemoryOnly: true});
currenciesDb.insert(currencies);

const each5Second = 5000;
const getRandomCurrencyId = (currenciesList) => ({_id: currenciesList[_.random(0, currenciesList.length -1)]._id});

function getRandomInt(lower, upper)
{
    //to create an even sample distribution
    return Math.floor(lower + (Math.random() * (upper - lower + 1)));
}

setInterval(() => {
    currenciesDb.find({}, (err, currenciesList) => {
        const query = getRandomCurrencyId(currenciesList);
        const value = {$set: {change: getRandomInt(60, 130)}};

        currenciesDb.update(query, value);
    });
}, each5Second);


module.exports = currenciesDb;

