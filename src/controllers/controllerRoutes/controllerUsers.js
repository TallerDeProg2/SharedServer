var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserUsers.js');
var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerRef = require('../controllerLogic/controllerRef.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

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

  var driver = request.body.type;

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
  var card = JSON.stringify({"ccvv": "",
              "expiration_month": "",
              "expiration_year": "",
              "method": "",
              "number": "",
              "type": ""
            });
  var transactions = JSON.stringify({"transactions" : []});
  var balance = 0;

  if (!username || !driver || !password || !firstname || !lastname || !country || !email || !birthdate){
    return parser.parserPostUser({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var _ref = controllerRef.createRef(username);

  var q = 'SELECT * FROM users WHERE (username=\'{}\') OR (email=\'{}\');'.format(username, email);
  var get_user = dataBase.promise_query_get(q);
  get_user.then(function (results) {

      if (results.length){
        return parser.parserPostUser({'success': false, 'status': 409, 'data_retrieved': "Username or email already taken"}, response);
      }

      var q = 'INSERT INTO users(_ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions, balance) values(\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\') RETURNING *;'.format(_ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions, balance);
      dataBase.query(q, response, parser.parserPostUser, auth);

    }).catch(function(err, done) {
      return parser.parserPostUser({'success': false, 'status': 500, 'data_retrieved': "Unexpected error "+err}, response);
    });


}

function postUsersValidate(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthServer(tk);

  var username = request.body.username;
  var password = request.body.password;
  var facebookToken = request.body.facebookauthtoken;

  if (!facebookToken && !password){
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
