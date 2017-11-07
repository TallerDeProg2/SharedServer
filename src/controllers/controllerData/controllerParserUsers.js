var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');


function rdata(data){
  var users = [];
  for (var i = 0; i < data.length; i++) {
      users[i] = {
        "id": data[i].id,
        "_ref": data[i].ref,
        "type": data[i].driver,
        "cars": data[i].car,
        "username": data[i].username,
        "firstName": data[i].firstName,
        "lastName": data[i].lastName,
        "country": data[i].country,
        "email": data[i].email,
        "birthdate": data[i].birthdate,
    };
  }
  return users;
}

function parserGetUsers(r, response) {
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data);
  }
  return basicParser.extendedParser(r, response, "users", data, 200);
}

function parserGetUser(r, response){
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "user", data, 200);
}

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
