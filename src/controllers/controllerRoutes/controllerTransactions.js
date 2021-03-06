/** @module controllerTransactions */

/**
* Controller for the endpoints of {@link routerTransactions}
*/

var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserTransactions.js');
var token = require('../controllerLogic/controllerToken.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');
var controllerRef = require('../controllerLogic/controllerRef.js');

var rp = require('request-promise');
var baseUri = "http://shielded-escarpment-27661.herokuapp.com/api/v1";
var tokenUri = "/user/oauth/authorize";
var paymethodsUri = "/paymethods";
var paymentUri = "/payments";
var clientId = "9792de0d-949e-40dd-ad98-c6fad7dff5d9";
var clientSecret = "e3cc5d9e-8a85-490a-a910-47155002893c";

var logger = require('../../srv/log.js');

function getUserTransactions(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT transactions FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserGetUserTransactions, auth);
}

function postUserTransactions(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);

  var tripId = request.body.trip;
  var currency = request.body.payment.currency;
  var value = request.body.payment.value;
  var paymethod = request.body.payment.paymethod;
  var transaction_id = request.body.payment.transaction_id;

  if (!tripId || !currency || !value || !paymethod || !transaction_id){
    return parser.parserPostUserTransactions({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  if (paymethod.method == "cash"){
    return parser.parserPostUserTransactions({'success': true, 'status': 200, 'data_retrieved': {
        "transaction_id": transaction_id,
        "currency": currency,
        "value": value,
        "paymentMethod": {
        "method": "cash"
        }
        }}, response);
  }

  if (paymethod.method != "card") {
    return parser.parserPostUserTransactions({'success': false, 'status': 400, 'data_retrieved': "You can only pay in card or cash!"}, response);
  }

  if (!paymethod.ccvv || !paymethod.expiration_month || !paymethod.expiration_year || !paymethod.number || !paymethod.type) {
    return parser.parserPostUserTransactions({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var resolve_auth = dataBase.promise_query_get(auth.query());
  resolve_auth.then(function (result) {

      var result_auth = auth.checkAuthorization({'success': true, 'status': 200, 'data_retrieved': result});
      if (!result_auth.success){
        return parser.parserPostTrips(result_auth, response);
      }

      var tk = getPaymentToken();

      var _refNew = controllerRef.createRef(userId);
      var q = 'UPDATE users SET _ref=\'{}\', balance=balance+{} WHERE id=\'{}\' RETURNING *;'.format(_refNew, value, userId);
      dataBase.query(q, response, parser.parserNull);
      makePayment(currency, value, paymethod, transaction_id, response);
    }).catch(function(err, done) {
      return parser.parserPostUserTransactions({'success': false, 'status': 500, 'data_retrieved': "Unexpected error "+err}, response);
    });
}

function getPaymethods(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var resolve_auth = dataBase.promise_query_get(auth.query());
  resolve_auth.then(function (result) {

      var result_auth = auth.checkAuthorization({'success': true, 'status': 200, 'data_retrieved': result});
      if (!result_auth.success){
        return parser.parserPostTrips(result_auth, response);
      }

      var tk = getPaymentToken();
      tk.then(function (tk_data){
        var options = {
          method: 'GET',
          uri: baseUri + paymethodsUri,
          headers: {
            'Authorization': 'Bearer ' + tk_data.access_token
          },
          json: true
        };
        rp(options).then(function (paymethods_retrieved) {
          parser.parserGetPaymethods({'success': true, 'status': 200, 'data_retrieved': paymethods_retrieved}, response);
        }).catch(function (err) {
          parser.parserGetPaymethods({'success': false, 'status': 500, 'data_retrieved': err}, response);
        });
      }).catch(function (err) {
        parser.parserGetPaymethods({'success': false, 'status': 401, 'data_retrieved': "Could not get token: "+err}, response);
      });

    }).catch(function(err, done) {
      return parser.parserGetPaymethods({'success': false, 'status': 500, 'data_retrieved': "Unexpected error "+err}, response);
    });
}

function getPaymentToken(){
  var options = {
			method: 'POST',
			uri: baseUri + tokenUri,
			body: {
				client_id: clientId,
				client_secret: clientSecret
			},
			json: true
		};
		return rp(options);
}

function makePayment(currency, value, paymethod, transaction_id, response){
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
      parser.parserPostUserTransactions({'success': true, 'status': 200, 'data_retrieved': payment_response}, response);
    }).catch(function (err) {
      parser.parserPostUserTransactions({'success': false, 'status': 500, 'data_retrieved': err}, response);
    });
  }).catch(function (err) {
    parser.parserPostUserTransactions({'success': false, 'status': 401, 'data_retrieved': "Could not get token: "+err}, response);
  });
}

module.exports = {
    getUserTransactions : getUserTransactions,
    postUserTransactions : postUserTransactions,
    getPaymethods : getPaymethods
};
