var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParser.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

function getUserTransactions(userId, request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthServer(tk);
  var q = 'SELECT * FROM userstransactions WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserUserTransactionsGet, auth);
}

function postUserTransactions(userId, request, response) {
  //TODO: ??????
}

function getPaymethods(request, response) {
  var tk = request.header.token;
  var auth = new controllerAuth.AuthServer(tk);
  var q = 'SELECT * FROM paymethods';
  dataBase.query(q, response, parser.parserPaymethodsGet, auth);
}
