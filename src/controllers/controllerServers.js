var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser.js');
var controllerAuth = require('./controllerAuth.js');

var id = require('./controllerId.js');
var token = require('./controllerToken.js');
//var ref = require('./controllerRef.js');

var logger = require('../srv/log.js');

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

function getServers(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM servers';
  dataBase.query(q, response, parser.parserServersGet, auth);
}

function getServer(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM servers WHERE id=\'{}\''.format(serverId);
  dataBase.query(q, response, parser.parserServerGet, auth);
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
  var createdBy = request.body.createdBy;
  var createdTime = request.body.createdTime;
  var name = request.body.name;
  var lastConnection = now_fr;
  var token = token.createToken();
  var exp = exp_date_fr;

  if (!createdBy || !createdTime || !name){
    return parser.parserServersPost({'success': false, 'status': 400, 'data': "Atribute missing"}, response);
  }

  var q = 'INSERT INTO servers(id, _ref, createdBy, createdTime, name, lastConnection, token, tokenexp) values(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.format(id, _ref, createdBy, createdTime, name, lastConnection, token, exp);
  dataBase.query(q, response, parser.parserServersPost, auth);
}

function putServer(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthManager(tk);

  var _ref = "";
  var name = request.body.name;
  var q = 'UPDATE servers SET _ref=\'{}\', name=\'{}\' WHERE id=\'{}\''.format(_ref, name, serverId);
  dataBase.query(q, response, parser.parserServersPut, auth);
}

function postServerToken(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthManager(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.

  var token = token.createToken();
  var exp = exp_date.format('YYYY-MM-DD HH:mm:ss Z');
  var q = 'UPDATE servers SET token=\'{}\', tokenexp=\'{}\' WHERE id=\'{}\''.format(token, exp, serverId);
  dataBase.query(q, response, parser.parserServersPost, auth);
}

function deleteServer(serverId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthManager(tk);

  var q = 'DELETE * FROM servers WHERE id=\'{}\''.format(serverId);
  dataBase.query(q, response, parser.parserServersDelete, auth);
}

function postServerPing(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthServer(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.

  var token = token.createToken();
  var lastConnection = now.format('YYYY-MM-DD HH:mm:ss Z');
  var exp = exp_date.format('YYYY-MM-DD HH:mm:ss Z');
  var q = 'UPDATE servers SET token=\'{}\', tokenexp=\'{}\', lastConnection=\'{}\' WHERE token=\'{}\''.format(token, exp, lastConnection, tk);
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
