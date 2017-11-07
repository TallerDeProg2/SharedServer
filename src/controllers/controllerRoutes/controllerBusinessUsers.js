var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserBusinessUsers.js');

var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerId = require('../controllerLogic/controllerId.js');
var controllerRef = require('../controllerLogic/controllerRef.js');

var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var format = require('string-format');
format.extend(String.prototype);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var logger = require('../../srv/log.js');

function getBusinessUsers(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);
  var q = 'SELECT * FROM srvusers WHERE rol=\'user\';';
  dataBase.query(q, response, parser.parserGetBusinessUsers, auth);
}

function postBusinessUsers(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);

  var now = moment();
  var exp_date = moment(now).add(1, 'day'); //token duration is one day.
  var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');
  var exp_date_fr = exp_date.format('YYYY-MM-DD HH:mm:ss Z');

  var id = controllerId.createId();
  var _ref = controllerRef.createRef(id);
  var token = controllerToken.createToken();
  var tokenexp = exp_date_fr;

  var json = {'username' : request.body.username,
              'password' : request.body.password,
              'name' : request.body.name,
              'surname' : request.body.surname,
              'roles' : request.body.roles};

  if (!json.username || !json.password || !json.name || !json.surname || !json.roles){
    return parser.parserPostBusinessUser({'success': false, 'status': 400, 'data': "Atribute missing"}, response);
  }

  var q = 'INSERT INTO srvUsers(id, _ref, token, tokenexp, rol, data) values(\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\') RETURNING *'.format(request.body.username, _ref, token, tokenexp, "user", JSON.stringify(json));
  dataBase.query(q, response, parser.parserPostBusinessUser, auth);
}

function deleteBusinessUser(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);
  var q = 'DELETE FROM srvUsers WHERE id=\'{}\' AND rol=\'user\' RETURNING *;'.format(userId);
  dataBase.query(q, response, parser.parserDeleteBusinessUser, auth);
}

function putBusinessUser(userId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthAdmin(tk);

  if (userId == "me"){
    userId = request.headers.id;
  }

  var _ref = controllerRef.createRef(userId);

  var json = {'username' : userId,
              'password' : request.body.password,
              'name' : request.body.name,
              'surname' : request.body.surname,
              'roles' : request.body.roles};

  if (!json.password || !json.name || !json.surname || !json.roles){
    return parser.parserPutBusinessUser({'success': false, 'status': 400, 'data': "Atribute missing"}, response);
  }

  var q = 'UPDATE srvUsers SET _ref=\'{}\', data = \'{}\' WHERE id=\'{}\' AND rol=\'user\' RETURNING *'.format(_ref, JSON.stringify(json), userId);
  dataBase.query(q, response, parser.parserPutBusinessUser, auth);
}

function getBusinessUsersMe(request, response) {
  logger.info("Mi header es: "+request.headers.id);
  var id = request.headers.id;
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM srvUsers WHERE id=\'{}\' AND rol=\'user\''.format(id);
  dataBase.query(q, response, parser.parserGetBusinessUser, auth);
}

function postToken(request, response) {}


module.exports = {
  getBusinessUsers : getBusinessUsers,
  postBusinessUsers : postBusinessUsers,
  deleteBusinessUser : deleteBusinessUser,
  putBusinessUser : putBusinessUser,
  getBusinessUsersMe : getBusinessUsersMe,
  postToken : postToken
};
