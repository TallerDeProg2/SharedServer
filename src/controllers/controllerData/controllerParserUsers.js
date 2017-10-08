var basicParser = require('./controllerParser.js');

function parserGetUsers(r, response) {}

function parserGetUser(r, response){}

function parserPutUser(r, response){}

function parserDeleteUser(r, response){}

function parserPostUser(r, response){}


module.exports = {
  parserGetUser : parserGetUser,
  parserGetUsers : parserGetUsers,
  parserPutUser : parserPutUser,
  parserDeleteUser : parserDeleteUser,
  parserPostUser : parserPostUser
};
