var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserTransactions.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

function getUserTransactions(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT transactions FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserGetUserTransactions, auth);
}

function postUserTransactions(userId, request, response) {
  //TODO: ??????
}

function getPaymethods(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT * FROM paymethods';
  dataBase.query(q, response, parser.parserGetPaymethods, auth);
}

module.exports = {
    getUserTransactions : getUserTransactions,
    postUserTransactions : postUserTransactions,
    getPaymethods : getPaymethods
};
