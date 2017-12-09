var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserServers.js');

var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerRef = require('../controllerLogic/controllerRef.js');

var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

function getServers(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM srvusers WHERE rol=\'server\';';
  dataBase.query(q, response, parser.parserGetServers, auth);
}

function getServer(serverId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM srvusers WHERE id=\'{}\' AND rol=\'server\';'.format(serverId);
  dataBase.query(q, response, parser.parserGetServer, auth);
}


function postServer(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.
  var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');
  var exp_date_fr = exp_date.format('YYYY-MM-DD HH:mm:ss Z');

  var token = controllerToken.createToken();
  var exp = exp_date_fr;

  var json = {'createdBy' : request.body.createdBy,
              'createdTime' : request.body.createdTime,
              'name' : request.body.name,
              'lastConnection' : now_fr};

  if (!json.createdBy || !json.createdTime || !json.name){
    return parser.parserPostServer({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var _ref = controllerRef.createRef(json.name);

  var q = 'INSERT INTO srvusers(_ref, rol, token, tokenexp, data) values(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\') RETURNING *;'.format(_ref, "server", token, exp, JSON.stringify(json));
  dataBase.query(q, response, parser.parserPostServer, auth);
}

function putServer(serverId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);

  var old_ref = request.body._ref;
  var _ref = controllerRef.createRef(serverId);

  var name = request.body.name;

  if (!name){
    return parser.parserPutServer({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = 'UPDATE srvusers SET _ref=\'{}\', data = jsonb_set(data, \'{}\', \'\"{}\"\') WHERE id=\'{}\' AND rol=\'server\' AND _ref =\'{}\' RETURNING *;'.format(_ref, '{name}', name, serverId, old_ref);
  dataBase.query(q, response, parser.parserPutServer, auth);
}

function postServerToken(serverId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.

  var token = controllerToken.createToken();
  var exp = exp_date.format('YYYY-MM-DD HH:mm:ss Z');
  var q = 'UPDATE srvusers SET token=\'{}\', tokenexp=\'{}\' WHERE id=\'{}\' AND rol=\'server\' RETURNING *;'.format(token, exp, serverId);
  dataBase.query(q, response, parser.parserPostServer, auth);
}

function deleteServer(serverId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);

  var q = 'DELETE FROM srvusers WHERE id=\'{}\' AND rol=\'server\' RETURNING *;'.format(serverId);
  dataBase.query(q, response, parser.parserDeleteServer, auth);
}

function postServerPing(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthServer(tk);

  var now = moment();
  var exp_date = moment(now).add(10, 'day'); //token duration is one day.

  var token = controllerToken.createToken();
  var exp = exp_date.format('YYYY-MM-DD HH:mm:ss Z');

  if (tk == "superservercito-token"){
    token = tk;
  }

  var lastConnection = now.format('YYYY-MM-DD HH:mm:ss Z');
  var q = 'UPDATE srvusers SET token=\'{}\', tokenexp=\'{}\', data = jsonb_set(data, \'{}\', \'\"{}\"\') WHERE token=\'{}\' RETURNING *;'.format(token, exp, '{lastConnection}', lastConnection, tk);
  dataBase.query(q, response, parser.parserPostServer, auth);
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
