var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserUsersCars.js');
var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerId = require('../controllerLogic/controllerId.js');
var controllerRef = require('../controllerLogic/controllerRef.js');
var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var logger = require('../../srv/log.js');

var format = require('string-format');
format.extend(String.prototype);

function getUserCar(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUserServer(tk);
  var q = 'SELECT car FROM users WHERE id=\'{}\' AND driver=\'driver\';'.format(userId);
  dataBase.query(q, response, parser.parserGetUserCar, auth);
}

function postUserCar(userId, request, response) {
    var tk = request.headers.token;
    var auth = new controllerAuth.AuthManagerServer(tk);

    var new_ref = controllerRef.createRef(userId);
    var car = {'brand': request.body.brand,
      'model': request.body.model,
      'color': request.body.color,
      'plate': request.body.plate,
      'year': request.body.year,
      'status': request.body.status,
      'radio': request.body.radio,
      'airconditioner': request.body.airconditioner,
      '_ref': new_ref
    };

    if (!car.model || !car.color || !car.plate || !car.year || !car.status || !car.radio){
        return parser.parserPostUserCar({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
    }

    var q = 'UPDATE users SET car=\'{}\' WHERE id=\'{}\' RETURNING *;'.format(JSON.stringify(car), userId);
    dataBase.query(q, response, parser.parserPostUserCar, auth);
}

function deleteUserCar(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManagerServer(tk);
  var q = 'UPDATE users SET car=\'{}\' WHERE id=\'{}\' RETURNING *;'.format("{}", userId);
  dataBase.query(q, response, parser.parserDeleteUserCar, auth);
}

function putUserCar(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManagerServer(tk);

  var _ref = request.body._ref;
  var new_ref = controllerRef.createRef(userId);

  var car = {'brand': request.body.brand,
    'model': request.body.model,
    'color': request.body.color,
    'plate': request.body.plate,
    'year': request.body.year,
    'status': request.body.status,
    'radio': request.body.radio,
    'airconditioner': request.body.airconditioner,
    '_ref': new_ref
  };

  if (!car.model || !car.color || !car.plate || !car.year || !car.status || !car.radio){
      return parser.parserPutUserCar({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = 'UPDATE users SET car=\'{}\' WHERE id=\'{}\' AND car->\'_ref\'=\'{}\' RETURNING *;'.format(JSON.stringify(car), userId, _ref);
  dataBase.query(q, response, parser.parserPutUserCar, auth);
}

module.exports = {
    getUserCar : getUserCar,
    postUserCar : postUserCar,
    deleteUserCar : deleteUserCar,
    putUserCar : putUserCar
};
