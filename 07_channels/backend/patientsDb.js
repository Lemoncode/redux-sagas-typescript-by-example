const Datastore = require('nedb');
const _  = require('lodash/fp');

const patients = [
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
      patient: "British Pound", 
      change: -0.03      
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

