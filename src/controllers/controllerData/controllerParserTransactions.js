var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function parserGetUserTransactions(r, response){
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
    var data = r.data_retrieved;
  }else{
    var data = r.data_retrieved[0].transactions.transactions;
  }
  return basicParser.extendedParser(r, response, "transactions", data, 200);
}

function parserPostUserTransactions(r, response){

}

function parserGetPaymethods(r, response) {
  return basicParser.extendedParser(r, response, "paymethods", r.data_retrieved, 200);
}


module.exports = {
  parserGetUserTransactions : parserGetUserTransactions,
  parserPostUserTransactions : parserPostUserTransactions,
  parserGetPaymethods : parserGetPaymethods
};
