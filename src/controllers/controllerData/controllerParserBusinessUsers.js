var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function rdata(data){
  var businessUsers = [];
  for (var i = 0; i < data.length; i++) {
      businessUsers[i] = {
        "_ref": data[i]._ref,
        "username": data[i].data.username,
        "password": data[i].data.password,
        "name": data[i].data.name,
        "surname": data[i].data.surname,
        "roles": data[i].data.roles
    };
  }
  return businessUsers;
}

function rdataToken(data) {
  return {"expiresAt" : data[0].token, "token" : data[0].tokenexp};
}

function parserGetBusinessUsers(r, response) {
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data);
  }
  return basicParser.extendedParser(r, response, "businessUsers", data, 200);
}

function parserGetBusinessUser(r, response){
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "businessUser", data, 200);
}

function parserPutBusinessUser(r, response){
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }else{
    return basicParser.reducedParser(r, response);
  }if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "businessUser", data, 200);
}

function parserDeleteBusinessUser(r, response){
  return basicParser.deleteParser(r, response);
}

function parserPostBusinessUser(r, response){
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }
  else{
    return basicParser.reducedParser(r, response);
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "businessUser", data, 201);
}

function parserPostToken(r, response){
  var data = r.data_retrieved;
  if (!data.length){
    r.status = 404;
    r.success = false;
  }
  if (r.success){
    data = rdataToken(data);
  }
  else{
    return basicParser.reducedParser(r, response);
  }
  return basicParser.extendedParser(r, response, "token", data, 201);
}

module.exports = {
  parserGetBusinessUser : parserGetBusinessUser,
  parserGetBusinessUsers : parserGetBusinessUsers,
  parserPutBusinessUser : parserPutBusinessUser,
  parserDeleteBusinessUser : parserDeleteBusinessUser,
  parserPostBusinessUser : parserPostBusinessUser,
  parserPostToken : parserPostToken
};
