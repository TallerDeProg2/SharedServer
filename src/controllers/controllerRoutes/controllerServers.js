var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserServers.js');

var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');

var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

//var ref = require('./controllerRef.js');

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

function getServers(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM srvUsers WHERE rol=\'server\'';
  dataBase.query(q, response, parser.parserGetServers, auth);
}

function getServer(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM srvUsers WHERE id=\'{}\', rol=\'server\''.format(serverId);
  dataBase.query(q, response, parser.parserGetServer, auth);
}


function postServer(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthManager(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.
  var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');
  var exp_date_fr = exp_date.format('YYYY-MM-DD HH:mm:ss Z');

  var id = id.createId();
  var _ref = "";
  var token = token.createToken();
  var exp = exp_date_fr;

  var json = {'createdBy' : request.body.createdBy,
              'createdTime' : request.body.createdTime,
              'name' : request.body.name,
              'lastConnection' : now_fr};

  if (!json.createdBy || !json.createdTime || !json.name){
    return parser.parserServersPost({'success': false, 'status': 400, 'data': "Atribute missing"}, response);
  }

  var q = 'INSERT INTO srvUsers(id, _ref, rol, token, tokenexp, json) values(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.format(id, _ref, "server", token, exp, json);
  dataBase.query(q, response, parser.parserPostServer, auth);
}

function putServer(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthManager(tk);

  var _ref = "";

  var name = request.body.name;
  var q = 'UPDATE srvUsers SET _ref=\'{}\', json = jsonb_set(json, \'{name}\', \'{}\') WHERE id=\'{}\', rol=\'server\', _ref=\'{}\''.format(_ref, name, serverId, request.body._ref);
  dataBase.query(q, response, parser.parserPutServer, auth);
}

function postServerToken(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthManager(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.

  var token = token.createToken();
  var exp = exp_date.format('YYYY-MM-DD HH:mm:ss Z');
  var q = 'UPDATE srvUsers SET token=\'{}\', tokenexp=\'{}\' WHERE id=\'{}\, rol=\'server\''.format(token, exp, serverId);
  dataBase.query(q, response, parser.parserPostServer, auth);
}

function deleteServer(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthManager(tk);

  var q = 'DELETE * FROM srvUsers WHERE id=\'{}\', rol=\'server\''.format(serverId);
  dataBase.query(q, response, parser.parserDeleteServer, auth);
}

function postServerPing(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthServer(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.

  var token = token.createToken();
  var lastConnection = now.format('YYYY-MM-DD HH:mm:ss Z');
  var exp = exp_date.format('YYYY-MM-DD HH:mm:ss Z');
  var q = 'UPDATE srvUsers SET token=\'{}\', tokenexp=\'{}\', json = jsonb_set(json, \'{lastConnection}\', \'{}\') WHERE token=\'{}\''.format(token, exp, lastConnection, tk);
  dataBase.query(q, response, parser.parserDeleteServer, auth);
}

module.exports = {
    postServer : postServer,
    getServers : getServers,
    getServer : getServer,
    putServer : putServer,
    postServerToken : postServerToken,
    postServerPing : postServerPing,
    deleteServer : deleteServer
};
