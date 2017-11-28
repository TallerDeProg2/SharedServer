var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function parserGetUserTrips(r, response) {
  return basicParser.extendedParser(r, response, "trips", r.data_retrieved, 200);
}

function parserPostTrips(r, response) {}

function parserPostTripEstimate(r, response) {}

function parserGetTrip(r, response) {
  var data = r.data_retrieved;
  if (r.success){
    data = r.data_retrieved[0];
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "trip", data, 200);
}

module.exports = {
    parserGetUserTrips : parserGetUserTrips,
    parserPostTrips : parserPostTrips,
    parserPostTripEstimate : parserPostTripEstimate,
    parserGetTrip : parserGetTrip
};
