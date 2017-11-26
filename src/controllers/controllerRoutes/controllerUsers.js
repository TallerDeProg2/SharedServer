var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserUsers.js');
var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerId = require('../controllerLogic/controllerId.js');
var controllerRef = require('../controllerLogic/controllerRef.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var logger = require('../../srv/log.js');

var format = require('string-format');
format.extend(String.prototype);

//users (id text, username text, password text, facebookId text, facebookToken text, firstname text, lastname text, country text, email text, birthdate timestamp, car jsonb, card jsonb)

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
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthServer(tk);

  var id = controllerId.createId();
  var driver = request.body.type;
  var _ref = controllerRef.createRef(id);
  var username = request.body.username;
  var password = request.body.password;
  var firstname = request.body.firstname;
  var lastname = request.body.lastname;
  var country = request.body.country;
  var email = request.body.email;
  var birthdate = request.body.birthdate;

  var facebookId = '';
  var facebookToken = '';

  if (request.body.fb){
    facebookId = request.body.fb.userId;
    facebookToken = request.body.fb.authToken;
  }

  var car = JSON.stringify({});
  var card = JSON.stringify({});
  var transactions = JSON.stringify({"transactions" : []});
  var trips = JSON.stringify({"trips" : []});
  var balance = 0;

  if (!username || !driver || !password || !firstname || !lastname || !country || !email || !birthdate){
    return parser.parserPostUser({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = 'INSERT INTO users(id, _ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions, balance, trips) values(\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\') RETURNING *;'.format(id, _ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions, balance, trips);
  dataBase.query(q, response, parser.parserPostUser, auth);
}

function postUsersValidate(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthServer(tk);

  var username = request.body.username;
  var password = request.body.password;
  var facebookToken = request.body.facebookauthtoken;

  if (!facebookToken && !password){
    logger.info("Mi username: "+username+", mi password: "+password+", mi facebookToken: "+facebookToken);
    return parser.parserPostValidateUser({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = "";

  if (!facebookToken){
    q = 'SELECT * FROM users WHERE username=\'{}\' AND password=\'{}\''.format(username, password);
  }else{
    q = 'SELECT * FROM users WHERE facebookId=\'{}\' AND facebookToken=\'{}\''.format(username, facebookToken);
  }

  dataBase.query(q, response, parser.parserPostValidateUser);
}

function deleteUser(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManagerServer(tk);
  var q = 'DELETE FROM users WHERE id=\'{}\' RETURNING *'.format(userId);
  dataBase.query(q, response, parser.parserDeleteUser, auth);
}

function putUser(userId, request, response) {
  var _ref = request.body._ref;
  var _refNew = controllerRef.createRef(userId);
  var password = request.body.password;
  var firstname = request.body.firstname;
  var lastname = request.body.lastname;
  var country = request.body.country;
  var tk = request.headers.token;

  var facebookId = '';
  var facebookToken = '';

  if (request.body.fb){
    facebookId = request.body.fb.userId;
    facebookToken = request.body.fb.authToken;
  }

  if (!_ref || !password || !firstname || !lastname || !country){
    logger.info("uyaaa");
    return parser.parserPutUser({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var auth = new controllerAuth.AuthServer(tk);
  var q = 'UPDATE users SET _ref=\'{}\', password=\'{}\', facebookId=\'{}\', facebookToken=\'{}\', firstname=\'{}\', lastname=\'{}\', country=\'{}\' WHERE id=\'{}\' AND _ref=\'{}\' RETURNING *;'.format(_refNew, password, facebookId, facebookToken, firstname, lastname, country, userId, _ref);
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
