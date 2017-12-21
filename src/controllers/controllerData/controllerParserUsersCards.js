/** @module controllerParserUsersCards */

/**
* ControllerParser for the endpoints of {@link routerUsersCards}
*/

var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function parserGetUserCard(r, response) {
  var data = r.data_retrieved[0];
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  if (r.success){
    data = data.card;
  }
  return basicParser.extendedParser(r, response, "card", data, 200);
}

function parserPostUserCard(r, response) {
  var data = r.data_retrieved[0];
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  if (r.success){
    data = data.card;
  }
  return basicParser.extendedParser(r, response, "card", data, 201);
}

function parserDeleteUserCard(r, response) {
  return basicParser.deleteParser(r, response);
}

function parserPutUserCard(r, response) {
  return parserGetUserCard(r, response);
}

module.exports = {
  parserGetUserCard : parserGetUserCard,
  parserPostUserCard : parserPostUserCard,
  parserDeleteUserCard : parserDeleteUserCard,
  parserPutUserCard : parserPutUserCard
}
