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
  var resolve_auth = dataBase.promise_query_get(auth.query());
  resolve_auth.then(function (result) {

      var result_auth = auth.checkAuthorization({'success': true, 'status': 200, 'data_retrieved': result});
      if (!result_auth.success){
        return parser.parserPostTrips(result_auth, response);
      }

      var tripId = request.body.trip;
      var currency = request.body.payment.currency;
      var value = request.body.payment.value;
      var paymethod = request.body.payment.paymethod;
      var transaction_id = request.body.payment.transaction_id;

      if (paymethod.method == "cash"){
        return parser.parserPostTrips({'success': true, 'status': 200, 'data_retrieved': "OK"}, response);
      }

      var tk = getPaymentToken();
      tk.then(function (tk_data){
        var options = {
    			method: 'POST',
    			uri: baseUri + paymentUri,
    			body: {
    				currency : currency,
    				value : value,
    				paymentMethod : paymethod,
            transaction_id : transaction_id
    			},
    			headers: {
    				'Authorization': 'Bearer ' + tk_data.access_token
    			},
    			json: true
        };
        rp(options).then(function (payment_response) {
          var _refNew = controllerRef.createRef(userId);
          var now = moment();
          var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');
          var new_transaction = {"id" : _refNew,
                            "trip" : tripId,
                            "timestamp" : now_fr,
                            "cost" : value,
                            "currency" : currency,
                            "description" : payment_response};
          var q = 'UPDATE users SET _ref=\'{}\', transactions=jsonb_insert(transactions, \'{}\', \'{}\') WHERE id=\'{}\' RETURNING *;'.format(_refNew, '{transactions, 0}', JSON.stringify(new_transaction), userId);
          dataBase.query(q, response, parser.parserNull, auth);
          parser.parserPostTrips({'success': true, 'status': 200, 'data_retrieved': new_transaction}, response);
        }).catch(function (err) {
          var _refNew = controllerRef.createRef(userId);
          var q = 'UPDATE users SET _ref=\'{}\', balance=balance-{} WHERE id=\'{}\' RETURNING *;'.format(_refNew, value, userId);
          dataBase.query(q, response, parser.parserNull, auth);
          parser.parserPostTrips({'success': false, 'status': 500, 'data_retrieved': err}, response);
        });
      }).catch(function (err) {
        var _refNew = controllerRef.createRef(userId);
        var q = 'UPDATE users SET _ref=\'{}\', balance=balance-{} WHERE id=\'{}\' RETURNING *;'.format(_refNew, value, userId);
        dataBase.query(q, response, parser.parserNull, auth);
        parser.parserPostTrips({'success': false, 'status': 401, 'data_retrieved': "Could not get token: "+err}, response);
      });
    }).catch(function(err, done) {
      var _refNew = controllerRef.createRef(userId);
      return parser({'success': false, 'status': 500, 'data_retrieved': "Unexpected error "+err}, response);
    });
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
