var basicParser = require('./controllerParser.js');

function rdata(data){
  var businessUsers = [];
  for (var i = 0; i < data.length; i++) {
      businessUsers[i] = {
        "id": data.json.id,
        "_ref": data.json._ref,
        "username": data.json.username,
        "password": data.json.password,
        "name": data.json.name,
        "surname": data.json.surname,
        "roles": data.json.roles
    };
  }
  return businessUsers;
}

function parserGetBusinessUsers(r, response) {
  return basicParser.extendedParser(r, response, "businessUsers", rdata(data), 200);
}

function parserGetBusinessUser(r, response){
  if (!r.data.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "businessUser", rdata(data)[0], 200);
}

function parserPutBusinessUser(r, response){
  return basicParser.extendedParser(r, response, "businessUser", rdata(data)[0], 200);
}

function parserDeleteBusinessUser(r, response){
  if (!r.data.length){
    r.status = 404;
    r.success = false;
  }
  if (!r.success){
    return basicParser.reducedParser(r, response);
  }
  return response.status(204);
}

function parserPostBusinessUser(r, response){
  return basicParser.extendedParser(r, response, "businessUser", rdata(data)[0], 201);
}


module.exports = {
  parserGetBusinessUser : parserGetBusinessUser,
  parserGetBusinessUsers : parserGetBusinessUsers,
  parserPutBusinessUser : parserPutBusinessUser,
  parserDeleteBusinessUser : parserDeleteBusinessUser,
  parserPostBusinessUser : parserPostBusinessUser
};
