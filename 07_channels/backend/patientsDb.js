const Datastore = require('nedb');
const _  = require('lodash/fp');

const patients = [
    {
      _id: "1",   
      patient: "Peter Grant", 
      room: "225", 
      bodyTemperature: 38.5, 
      hearthRate: 120, 
      hiBloodPressure: 15,
      loBloodPressure: 10
    },    
    {
      _id: "2",   
      patient: "John Doe", 
      room: "223", 
      bodyTemperature: 36.8, 
      hearthRate: 90, 
      hiBloodPressure: 12,
      loBloodPressure: 8
    },
    {
      _id: "3",   
      patient: "Mary Wien", 
      room: "226", 
      bodyTemperature: 37.0, 
      hearthRate: 95, 
      hiBloodPressure: 13,
      loBloodPressure: 9
    },    
];

const patientsDb = new Datastore({inMemoryOnly: true});
patientsDb.insert(patients);

const each5Second = 5000;
const getRandomPatientId = (patientsList) => ({_id: patientsList[_.random(0, patientsList.length -1)]._id});

function getRandomInt(lower, upper)
{
    //to create an even sample distribution
    return Math.floor(lower + (Math.random() * (upper - lower + 1)));
}

setInterval(() => {
    patientsDb.find({}, (err, patientsList) => {
        const query = getRandomPatientId(patientsList);
        const value = {$set: {hearthRate: getRandomInt(60, 130)}};

        patientsDb.update(query, value);
    });
}, each5Second);


module.exports = patientsDb;

