var pg = require('pg');
var express = require('express');
var bodyParser = require('body-parser');

var routerExample = require('../routes/routerHello.js');

var routerAppSrv = require('../routes/routerAppSrv.js');
var routerAdmin = require('../routes/routerAdmin.js');
var routerManager = require('../routes/routerManager.js');
var routerUser = require('../routes/routerUser.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5500));


//app.use('/', routerExample);

app.use('/', routerAppSrv);
//app.use('/', routerAdmin);
//app.use('/', routerManager);
//app.use('/', routerUser);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
