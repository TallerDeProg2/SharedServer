/** @module controllerTrips */

/**
* Controller for the endpoints of {@link routerTrips}
*/

var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserTrips.js');
var token = require('../controllerLogic/controllerToken.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var controllerTransactions = require('./controllerTransactions.js');
var controllerRules = require('./controllerRules.js');

var rp = require('request-promise');
var baseUri = "http://shielded-escarpment-27661.herokuapp.com/api/v1";
var paymentUri = "/payments";

function getUserTrips(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT * FROM trips WHERE (driver=\'{}\') OR (passenger=\'{}\');'.format(userId, userId);
  dataBase.query(q, response, parser.parserGetUserTrips, auth);
}

function postTrips(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var _refNew = controllerRef.createRef(userId);
  var now = moment();
  var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

  var new_transaction = {"id" : _refNew,
                    "trip" : request.body.tripid,
                    "timestamp" : now_fr,
                    "value" : request.body.value,
                    "paymethod" : request.body.paymethod,
                    "currency" : request.body.payment.currency,
                    "description" : request.body.description};

  if (!request.body.tripid || !request.body.value || !request.body.paymethod || !request.body.payment.currency){
    return parser.parserPostTrip({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = 'UPDATE users SET _ref=\'{}\', transactions=jsonb_insert(transactions, \'{}\', \'{}\') WHERE id=\'{}\' RETURNING *;'.format(_refNew, '{transactions, 0}', JSON.stringify(new_transaction), userId);
  dataBase.query(q, response, parser.parserPostTrip, auth);
}

function postTripEstimate(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthServer(tk);
  var trip = {"distance" : request.body.distance,
              "time" : request.body.traveltime,
              "paymethod" : request.body.paymethod,
              "day" : request.body.day,
              "travelhour" : request.body.travelhour};
  return controllerRules.getEstimateForTrip([trip], response, parser.parserPostTripEstimate, auth);
}

function getTrip(tripId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT * FROM trips WHERE id=\'{}\';'.format(tripId);
  dataBase.query(q, response, parser.parserGetTrip, auth);
}


module.exports = {
    getUserTrips : getUserTrips,
    postTrips : postTrips,
    postTripEstimate : postTripEstimate,
    getTrip : getTrip
};
