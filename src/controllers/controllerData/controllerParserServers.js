var basicParser = require('./controllerParser.js');

function rdata(data){
  var servers = [];
  for (var i = 0; i < data.length; i++) {
      servers[i] = {
      "id": data[i].id,
      "_ref": data[i]._ref,
      "createdBy": data[i].json.createdBy,
      "createdTime": data[i].json.createdTime,
      "name": data[i].json.name,
      "lastConnection": data[i].json.lastConnection
    };
  }
  return servers;
}

function rdataPost(data){
  var servers = [];
  for (var i = 0; i < data.length; i++) {
      servers[i] = { "server": {
        "id": data[i].id,
        "_ref": data[i]._ref,
        "createdBy": data[i].json.createdBy,
        "createdTime": data[i].json.createdTime,
        "name": data[i].json.name,
        "lastConnection": data[i].json.lastConnection
      },
      "token": {
        "expiresAt": data[i].tokenexp,
        "token": data[i].token
      }};
  }
  return servers;
}

function parserGetServers(r, response) {
  return basicParser.extendedParser(r, response, "servers", rdata(data), 200);
}

function parserGetServer(r, response){
  if (!r.data.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "server", rdata(data)[0], 200);
}

function parserPutServer(r, response){
  return basicParser.extendedParser(r, response, "server", rdata(data)[0], 200);
}

function parserDeleteServer(r, response){
  if (!r.data.length){
    r.status = 404;
    r.success = false;
  }
  if (!r.success){
    return basicParser.reducedParser(r, response);
  }
  return response.status(204);
}

function parserPostServer(r, response){
  return basicParser.extendedParser(r, response, "server", rdataPost(data)[0], 201);
}


module.exports = {
  parserGetServer : parserGetServer,
  parserGetServers : parserGetServers,
  parserPutServer : parserPutServer,
  parserDeleteServer : parserDeleteServer,
  parserPostServer : parserPostServer
};
