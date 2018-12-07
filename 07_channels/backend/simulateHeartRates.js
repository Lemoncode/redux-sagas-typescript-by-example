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
            const value = {$set: {hearthRate: getRandomInt(60, 130)}};

            patientsDb.update(query, value);

            cb();
        });
    }, each5Second);
};
