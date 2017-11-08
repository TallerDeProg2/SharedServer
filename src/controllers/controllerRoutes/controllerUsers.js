var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserUsers.js');
var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerId = require('../controllerLogic/controllerId.js');
var controllerRef = require('../controllerLogic/controllerRef.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var logger = require('../../srv/log.js');

var format = require('string-format');
format.extend(String.prototype);

//users (id text, username text, password text, facebookId text, facebookToken text, firstName text, lastName text, country text, email text, birthdate timestamp, car jsonb, card jsonb)

function getUsers(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT * FROM users;';
  dataBase.query(q, response, parser.parserGetUsers, auth);
}

function getUser(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT * FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserGetUser, auth);
}

function postUser(request, response) {
  var id = controllerId.createId();
  var driver = request.body.type;
  var _ref = controllerRef.createRef(id);
  var username = request.body.username;
  var password = request.body.password;
  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var country = request.body.country;
  var email = request.body.email;
  var birthdate = request.body.birthdate;

  var facebookId = '';
  var facebookToken = '';

  if (request.body.fb){
    facebookId = request.body.fb.userId;
    facebookToken = request.body.fb.authToken;
  }

  car = JSON.stringify({});
  card = JSON.stringify({});

  if (!username || !driver || !password || !firstName || !lastName || !country || !email || !birthdate){
    logger.info("uyaaaa");
    return parser.parserPostUser({'success': false, 'status': 400, 'data': "Atribute missing"}, response);
  }

  var tk = request.headers.token;
  var auth = new controllerAuth.AuthServer(tk);
  var q = 'INSERT INTO users(id, _ref, driver, username, password, facebookId, facebookToken, firstName, lastName, country, email, birthdate, car, card) values(\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\') RETURNING *;'.format(id, _ref, driver, username, password, facebookId, facebookToken, firstName, lastName, country, email, birthdate, car, card);
  dataBase.query(q, response, parser.parserPostUser, auth);
}

function postUsersValidate(request, response) {}

function deleteUser(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManagerServer(tk);
  var q = 'DELETE FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserDeleteUser, auth);
}

function putUser(userId, request, response) {
  var _ref = request.body._ref;
  var _refNew = controllerRef.createRef(userId);
  var password = request.body.password;
  var facebookId = request.body.fb.userId;
  var facebookToken = request.body.fb.authToken;
  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var country = request.body.country;
  var tk = request.headers.token;

  var auth = new controllerAuth.AuthServer(tk);
  var q = 'UPDATE users SET _ref=\'{}\', password=\'{}\', facebookId=\'{}\', facebookToken=\'{}\', firstName=\'{}\', lastName=\'{}\', country=\'{}\' WHERE id=\'{}\' AND _ref=\'{}\';'.format(_refNew, password, facebookId, facebookToken, firstName, lastName, country, userId, _ref);
  dataBase.query(q, response, parser.parserPutUser, auth);
}

module.exports = {
    postUser : postUser,
    getUsers : getUsers,
    getUser : getUser,
    putUser : putUser,
    postUsersValidate : postUsersValidate,
    deleteUser : deleteUser
};
