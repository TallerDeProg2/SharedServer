var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserBusinessUsers.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var format = require('string-format');
format.extend(String.prototype);

var logger = require('../../srv/log.js');

function getBusinessUsers(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);
  var q = 'SELECT * FROM srvusers WHERE rol=\'user\';';
  dataBase.query(q, response, parser.parserGetBusinessUsers);
}

function postBusinessUsers(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);

  var id = id.createId();
  var ref = "";
  var token = "";
  var tokenexp = "";
  var json = {'username' : request.body.username,
              'password' : request.body.password,
              'name' : request.body.name,
              'surname' : request.body.surname,
              'roles' : request.body.roles};

  var q = 'INSERT INTO srvUsers(id, _ref, token, tokenexp, rol, json) values(\'{}\', \'{}\', \'{}\', \'{}\', \'{}\')'.format(id, ref, token, tokenexp, "user", json);
  dataBase.query(q, response, parser.parserPostBusinessUser);
}

function deleteBusinessUser(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);
  var q = 'DELETE * FROM srvUsers WHERE id=\'{}\', rol=\'user\''.format(userId);
  dataBase.query(q, response, parser.parserDeleteBusinessUser);
}

function putBusinessUser(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);

  var ref = "";
  var username = request.body.username;
  var password = request.body.password;
  var name = request.body.name;
  var surname = request.body.surname;
  var roles = request.body.roles;

  var q = 'UPDATE srvUsers SET _ref=\'{}\', json = jsonb_set(json, \'{username}\', \'{}\', \'{password}\', \'{}\', \'{name}\', \'{}\', \'{surname}\', \'{}\', \'{roles}\', \'{}\') WHERE id=\'{}\''.format(userId, ref, username, password, name, surname, roles);
  dataBase.query(q, response, parser.parserPutBusinessUser);
}

function getBusinessUsersMe(request, response) {
  logger.info("Mi header es: "+request.headers.id);
  var id = request.headers.id;
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM srvUsers WHERE id=\'{}\' AND rol=\'user\''.format(id);
  dataBase.query(q, response, parser.parserGetBusinessUser);
}

function putBusinessUsersMe(request, response) {
  var tk = request.headers.token;
  var id = request.headers.id;
  var auth = new controllerAuth.AuthAdmin(tk);

  var ref = "";
  var username = request.body.username;
  var password = request.body.password;
  var name = request.body.name;
  var surname = request.body.surname;
  var roles = request.body.roles;

  var q = 'UPDATE srvUsers SET _ref=\'{}\', json = jsonb_set(json, \'{username}\', \'{}\', \'{password}\', \'{}\', \'{name}\', \'{}\', \'{surname}\', \'{}\', \'{roles}\', \'{}\') WHERE id=\'{}\', rol=\'server\''.format(id, ref, username, password, name, surname, roles);
  dataBase.query(q, response, parser.parserPutBusinessUser);
}

function postToken(request, response) {}


module.exports = {
  getBusinessUsers : getBusinessUsers,
  postBusinessUsers : postBusinessUsers,
  deleteBusinessUser : deleteBusinessUser,
  putBusinessUser : putBusinessUser,
  getBusinessUsersMe : getBusinessUsersMe,
  putBusinessUsersMe : putBusinessUsersMe,
  postToken : postToken
};
