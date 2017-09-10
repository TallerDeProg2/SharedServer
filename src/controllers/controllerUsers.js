var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser.js');

function getUsers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM drivers', response, parser.parserUsers);
}

function postUsers() {}

function postUsersValidate() {}

function deleteUser(userId) {}

function getUser(userId) {}

function putUser(userId) {}

module.exports.getUsers = getUsers;
