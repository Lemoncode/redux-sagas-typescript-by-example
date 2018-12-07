var ODataServer = require("simple-odata-server");
var db = require('./database');
var host = process.env.npm_config_host || 'http://localhost';
var port = Number(process.env.npm_config_port) || 1337;

module.exports = (app) => {
    var model = {
        namespace: "Showcase",
        entityTypes: {
            "Patient": {
                "_id": {"type": "Edm.String", key: true},                
                "patient": {"type": "Edm.String"},
                "room": {"type": "Edm.String"},
                "bodyTemperature": {"type": "Edm.Decimal"},
                "hearthRate": {"type": "Edm.Decimal"},
                "hiBloodPressure": {"type": "Edm.Decimal"},
                "loBloodPressure": {"type": "Edm.Decimal"},                                
            },
        },
        entitySets: {
            "patients": {
                entityType: "Showcase.Patient"
            }            
        }
    };

    var odataServer = ODataServer(`${host}:${port}`)
        .model(model)
        .onNeDB(function (es, cb) {
            cb(null, db.patientsDb)
        });


    app.use("/patients*", function (req, res) {
        odataServer.handle(req, res);
    });
    
};
