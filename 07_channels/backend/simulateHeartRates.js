var patientsDb = require('./patientsDb');
var _ = require('lodash');

const eachXSeconds = 5000;
const getRandomPatientId = (patientsList) => ({_id: patientsList[_.random(0, patientsList.length -1)]._id});

function getRandomInt(lower, upper) {
    //to create an even sample distribution
    return Math.floor(lower + (Math.random() * (upper - lower + 1)));
}

function getRandomNumber(lower, upper) {
  //to create an even sample distribution
  return (lower + (Math.random() * (upper - lower + 1))).toFixed(2);
}


module.exports = (cb) => {
    setInterval(() => {
        patientsDb.find({}, (err, patientsList) => {
            const query = getRandomPatientId(patientsList);
            const change = getRandomNumber(-1, 1);
            const value = {$set: {change}};

            patientsDb.update(query, value);

            const data = {id: query._id, currency: query.currency, change};

            cb(data);
        });
    }, eachXSeconds);
};
