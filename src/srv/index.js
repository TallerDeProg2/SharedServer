/**
     * @fileOverview Main of APIRest server.
     */

//----------------->Initial settings<----------------------//
var express = require('express');
var bodyParser = require('body-parser');

var router = require('../routes/router.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//----------------->Debug&Log<--------------------//
var debug = require('debug')('ServerApi');
var app_name = 'Shared server';

var logger = require('./log.js');

debug('Iniciando %o', app_name);
logger.info('Iniciando ', app_name);

router.use(function timeLog(req, res, next) {
  debug(req.method + ' ' + req.url);
  next();
});

app.use(require("morgan")("combined", { "stream": logger.stream }));

//---------------->Routes<----------------//
var routerExample = require('../routes/routerHello.js');

var routerBusinessUsers = require('../routes/routerBusinessUsers.js');
var routerRules = require('../routes/routerRules.js');
var routerServers = require('../routes/routerServers.js');
var routerTransactions = require('../routes/routerTransactions.js');
var routerTrips = require('../routes/routerTrips.js');
var routerUsers = require('../routes/routerUsers.js');
var routerUsersCars = require('../routes/routerUsersCars.js');
var routerUsersCards = require('../routes/routerUsersCards.js');


//---------------->Listen<----------------//
app.set('port', (process.env.PORT || 5000));

app.use('/', router);

app.listen(app.get('port'), function() {
  logger.info('Escuchando puerto ', app.get('port'));
  debug('Escuchando puerto %o', app.get('port'));
});

module.exports = app;
