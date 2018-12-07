var patientsDb = require('./patientsDb');
var _ = require('lodash');

const each5Second = 5000;
const getRandomPatientId = (patientsList) => ({_id: patientsList[_.random(0, patientsList.length -1)]._id});

function getRandomInt(lower, upper) {
    //to create an even sample distribution
    return Math.floor(lower + (Math.random() * (upper - lower + 1)));
}

module.exports = (cb) => {
    setInterval(() => {
        patientsDb.find({}, (err, patientsList) => {
            const query = getRandomPatientId(patientsList);
            const newHearthBit = getRandomInt(60, 130);
            const value = {$set: {hearthRate: newHearthBit}};

            patientsDb.update(query, value);

            const data = {id: query._id, hearthRate: newHearthBit};

            cb(data);
        });
    }, each5Second);
};
