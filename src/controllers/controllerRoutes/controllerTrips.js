var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserTrips.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var controllerRules = require('./controllerRules.js');

function getUserTrips(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT * FROM trips WHERE (driver=\'{}\') OR (passenger=\'{}\')'.format(userId, userId);
  dataBase.query(q, response, parser.parserGetUserTrips, auth);
}

function postTrips(request, response) {}

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
