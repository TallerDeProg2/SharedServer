var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserTransactions.js');
var token = require('../controllerLogic/controllerToken.js');
var id = require('../controllerLogic/controllerId.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var rp = require('request-promise');
var baseUri = "http://shielded-escarpment-27661.herokuapp.com/api/v1";
var tokenUri = "/user/oauth/authorize";
var paymethodsUri = "/paymethods";
var paymentUri = "/payments";
var clientId = "9792de0d-949e-40dd-ad98-c6fad7dff5d9";
var clientSecret = "e3cc5d9e-8a85-490a-a910-47155002893c";

function getUserTransactions(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT transactions FROM users WHERE id=\'{}\''.format(userId);
  dataBase.query(q, response, parser.parserGetUserTransactions, auth);
}

/*
  "transaction": {
    "id": "string",
    "trip": "string",
    "timestamp": 0,
    "cost": {
      "currency": "string",
      "value": 0
    },
    "description": "string",
    "data": {}
  }
*/

function postUserTransactions(userId, request, response) {
  var tripId = request.body.trip.id;
  var tripCost = request.body.trip.cost;
  var currency = request.body.payment.currency;
  var value = request.body.payment.value;
  var paymethod = request.body.payment.paymethod;
  var tk = getPaymentToken();
  tk.then(function (tk_data){
    var options = {
			method: 'POST',
			uri: baseUri + paymentUri,
			body: {
				currency: currency,
				value: value,
				paymentMethod: paymethod
			},
			headers: {
				'Authorization': 'Bearer ' + token
			},
			json: true
    };
    rp(options).then(function (payment_response) {
      parser.parserGetPaymethods({'success': true, 'status': 200, 'data_retrieved': paymethods_retrieved}, response);
    }).catch(function (payment_response) {
      parser.parserGetPaymethods({'success': false, 'status': 500, 'data_retrieved': err}, response);
    });
  }).catch(function (payment_response) {
    parser.parserGetPaymethods({'success': false, 'status': 401, 'data_retrieved': "Could not get token: "+err}, response);
  });

}

function getPaymethods(request, response) {
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

module.exports = {
    getUserTransactions : getUserTransactions,
    postUserTransactions : postUserTransactions,
    getPaymethods : getPaymethods
};
