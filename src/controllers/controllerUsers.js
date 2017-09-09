var dataBase = require('./controllerDataBase.js');

function basicParser(r, response){
  return response.status(r.status).json({success: r.success, data: r.data});
}

function getUsers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM drivers', response, basicParser);
}

function postUsers() {}

function postUsersValidate() {}

function deleteUser(userId) {}

function getUser(userId) {}

function putUser(userId) {}

module.exports.getUsers = getUsers;
