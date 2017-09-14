var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser.js');

function getUsers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM users', response, parser.parserUsers, 200);
}

function postUsers(request, response) {}

function postUsersValidate(request, response) {}

function deleteUser(userId, request, response) {}

function getUser(userId, request, response) {
  var q = 'SELECT * FROM users WHERE id=\''+userId+'\'';
  dataBase.query(q, response, parser.parserUsers, 200);
}

function putUser(userId, request, response) {}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
