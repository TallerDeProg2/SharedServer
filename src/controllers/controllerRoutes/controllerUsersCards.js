var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserUsersCards.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var format = require('string-format');
format.extend(String.prototype);

function getUserCard(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT card FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserGetUserCard, auth);
}

function postUserCard(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);

  var card = {"ccvv": request.body.ccvv,
              "expiration_month": request.body.expiration_month,
              "expiration_year": request.body.expiration_year,
              "method": request.body.method,
              "number": request.body.number,
              "type": request.body.type
            };

  if (!card.ccvv || !card.expiration_month || !card.expiration_year || !card.method || !card.number || !card.type){
    return parser.parserPostUserCard({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = 'UPDATE users SET card=\'{}\' WHERE id=\'{}\' RETURNING *;'.format(JSON.stringify(card), userId);
  dataBase.query(q, response, parser.parserPostUserCard, auth);
}

function putUserCard(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);

  var card = {"ccvv": request.body.ccvv,
              "expiration_month": request.body.expiration_month,
              "expiration_year": request.body.expiration_year,
              "method": request.body.method,
              "number": request.body.number,
              "type": request.body.type
            };

  if (!card.ccvv || !card.expiration_month || !card.expiration_year || !card.method || !card.number || !card.type){
    return parser.parserPostUserCard({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = 'UPDATE users SET card=\'{}\' WHERE id=\'{}\' RETURNING *;'.format(JSON.stringify(card), userId);
  dataBase.query(q, response, parser.parserPutUserCard, auth);
}

function deleteUserCard(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);

  var card = {};

  var q = 'UPDATE users SET card=\'{}\' WHERE id=\'{}\' RETURNING *;'.format(JSON.stringify(card), userId);
  dataBase.query(q, response, parser.parserDeleteUserCard, auth);
}

module.exports = {
  getUserCard : getUserCard,
  postUserCard : postUserCard,
  putUserCard : putUserCard,
  deleteUserCard : deleteUserCard
}
