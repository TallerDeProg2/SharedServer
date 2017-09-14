var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser');

var format = require('string-format');

function getBusinessUsers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM businessusers', response, parser.parserBusinessUsers, 200);
}

function postBusinessUsers(request, response) {}

function deleteBusinessUser(userId, request, response) {}

function putBusinessUser(userId, request, response) {}

function getBusinessUsersMe(request, response) {}

function putBusinessUsersMe(request, response) {}
