var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParser.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var auth = require('../controllerLogic/controllerAuthorization.js');

function getUsers(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthServer(tk);
  var q = 'SELECT * FROM users';
  dataBase.query(q, response, parser.parserUsersGet, auth);
}

function postUsers(request, response) {}

function postUsersValidate(request, response) {}

function deleteUser(userId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthServer(tk);
  var q = 'DELETE * FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserUsersDelete, auth);
}

function getUser(userId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthServer(tk);
  var q = 'SELECT * FROM users WHERE id=\''+userId+'\'';
  dataBase.query(q, response, parser.parserUsersGet, auth);
}

function putUser(userId, request, response) {}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
