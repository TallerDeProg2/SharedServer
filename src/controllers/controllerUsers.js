var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser.js');

function getUsers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM drivers', response, parser.parserUsers);
}

function postUsers(request, response) {}

function postUsersValidate(request, response) {}

function deleteUser(userId, request, response) {}

function getUser(userId, request, response) {
  dataBase.query(('SELECT * FROM servers WHERE lastname=($1)', [userId]), response, parser.parserUsers);
}

function putUser(userId, request, response) {}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
