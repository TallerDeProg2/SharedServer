var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParser.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var format = require('string-format');
format.extend(String.prototype);

function getBusinessUsers(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthAdmin(tk);
  var q = 'SELECT * FROM businessusers';
  dataBase.query(q, response, parser.parserBusinessUsersGet, auth);
}

function postBusinessUsers(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthAdmin(tk);

  var id = id.createId();
  var ref = "";
  var username = request.body.username;
  var password = request.body.password;
  var name = request.body.name;
  var surname = request.body.surname;
  var roles = request.body.roles;

  var q = 'INSERT INTO businessusers(id, _ref, username, password, name, surname, roles) values(\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\')'.format(id, ref, username, password, name, surname, roles);
  dataBase.query(q, response, parser.parserBusinessUsersPost, auth);
}

function deleteBusinessUser(userId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthAdmin(tk);
  var q = 'DELETE * FROM businessusers WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserBusinessUsersDelete, auth);
}

function putBusinessUser(userId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthAdmin(tk);

  var ref = "";
  var username = request.body.username;
  var password = request.body.password;
  var name = request.body.name;
  var surname = request.body.surname;
  var roles = request.body.roles;

  var q = 'UPDATE businessusers SET _ref=\'{}\', username=\'{}\', password=\'{}\', name=\'{}\', surname=\'{}\', roles=\'{}\' WHERE id=\'{}\''.format(userId, ref, username, password, name, surname, roles);
  dataBase.query(q, response, parser.parserBusinessUsersPost, auth);
}

function getBusinessUsersMe(request, response) {
  var id = request.header.id;
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM businessusers WHERE id=\'{}\''.format(idd);
  dataBase.query(q, response, parser.parserServerGet, auth);
}

function putBusinessUsersMe(request, response) {
  var tk = request.header.token;
  var id = request.header.id;
  var auth = new controllerAuth.AuthAdmin(tk);

  var ref = "";
  var username = request.body.username;
  var password = request.body.password;
  var name = request.body.name;
  var surname = request.body.surname;
  var roles = request.body.roles;

  var q = 'UPDATE businessusers SET _ref=\'{}\', username=\'{}\', password=\'{}\', name=\'{}\', surname=\'{}\', roles=\'{}\' WHERE id=\'{}\''.format(id, ref, username, password, name, surname, roles);
  dataBase.query(q, response, parser.parserBusinessUsersPost, auth);
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
