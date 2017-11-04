var basicParser = require('./controllerParser.js');

function rdata(data){
  var businessUsers = [];
  for (var i = 0; i < data.length; i++) {
      businessUsers[i] = {
        "id": data[i].id,
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
  var data = r.data;
  if (r.success){
    data = rdata(r.data)[0];
  }
  return basicParser.extendedParser(r, response, "businessUser", data, 200);
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
  var data = r.data;
  if (r.success){
    data = rdata(r.data)[0];
  }
  return basicParser.extendedParser(r, response, "businessUser", data, 201);
}


module.exports = {
  parserGetBusinessUser : parserGetBusinessUser,
  parserGetBusinessUsers : parserGetBusinessUsers,
  parserPutBusinessUser : parserPutBusinessUser,
  parserDeleteBusinessUser : parserDeleteBusinessUser,
  parserPostBusinessUser : parserPostBusinessUser
};
