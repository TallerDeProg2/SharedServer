var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserUsers.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var auth = require('../controllerLogic/controllerAuthorization.js');


function getUsers(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM users';
  dataBase.query(q, response, parser.parserGetUsers, auth);
}


function postUser(request, response) {
  var type = request.body.type;
  var _refNew = "";
  var username = request.body.username;
  var password = request.body.password;
  var userIdFacebook = request.body.fb.userId;
  var authTokenFacebook = request.body.fb.authToken;
  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var country = request.body.country;
  var email = request.body.email;
  var birthdate = request.body.birthdate;

  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'INSERT INTO users(type, _ref, username, password, userIdFacebook, authTokenFacebook, firstName, lastName, country, email, birthdate) values(\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\');'.format(type, _ref, username, password, userIdFacebook, authTokenFacebook, firstName, lastName, country, email, birthdate);
  dataBase.query(q, response, parser.parserDeleteUser, auth);
}

function postUsersValidate(request, response) {}

function deleteUser(userId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'DELETE * FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserDeleteUser, auth);
}

function getUser(userId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM users WHERE id=\''+userId+'\'';
  dataBase.query(q, response, parser.parserGetUser, auth);
}

function putUser(userId, request, response) {
  var _ref = request.body._ref;
  var _refNew = "";
  var password = request.body.password;
  var userIdFacebook = request.body.fb.userId;
  var authTokenFacebook = request.body.fb.authToken;
  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var country = request.body.country;

  var tk = request.header.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'UPDATE users SET _ref=\'{}\', password=\'{}\', userIdFacebook=\'{}\', authTokenFacebook=\'{}\', firstName=\'{}\', lastName=\'{}\', country=\'{}\' WHERE id=\'{}\';'.format(_refNew, password, userIdFacebook, authTokenFacebook, firstName, lastName, country, userId);
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
