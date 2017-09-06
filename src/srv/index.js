var express = require('express');
var bodyParser = require('body-parser');

//---------------->Routes<----------------//
var router = require('../routes/router.js');

var routerExample = require('../routes/routerHello.js');

var routerBusinessUsers = require('../routes/routerBusinessUsers.js');
var routerRules = require('../routes/routerRules.js');
var routerServers = require('../routes/routerServers.js');
var routerTransactions = require('../routes/routerTransactions.js');
var routerTrips = require('../routes/routerTrips.js');
var routerUsers = require('../routes/routerUsers.js');
var routerUsersCars = require('../routes/routerUsersCars.js');

//---------------->App<----------------//
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5500));

app.use('/', router);

//---------------->Port<----------------//
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
