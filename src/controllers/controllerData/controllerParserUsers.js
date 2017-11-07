var basicParser = require('./controllerParser.js');

function parserGetUsers(r, response) {} //200

function parserGetUser(r, response){} //200

function parserPutUser(r, response){} //200

function parserDeleteUser(r, response){} //204

function parserPostUser(r, response){} //201

//----------------------------------------------//


module.exports = {
  parserGetUser : parserGetUser,
  parserGetUsers : parserGetUsers,
  parserPutUser : parserPutUser,
  parserDeleteUser : parserDeleteUser,
  parserPostUser : parserPostUser
};
