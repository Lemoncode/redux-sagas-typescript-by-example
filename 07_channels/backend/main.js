var express = require('express');
var cors = require('cors');
var app = express();
var server = require('http').Server(app);
var db = require('./database');
var io = require('socket.io')(server);
var connectSocket = require('./socketIo');
var simulateHeartRates = require('./simulateCurrencyUpdates');

app.use(cors({origin: true, credentials: true}));

var port = Number(process.env.npm_config_port) || 1337;

server.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

const sockets = connectSocket(io);
simulateHeartRates((data) => sockets.notifyClients('currency', data));