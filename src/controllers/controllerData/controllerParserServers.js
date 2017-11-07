var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function rdata(data){
  var servers = [];
  for (var i = 0; i < data.length; i++) {
      servers[i] = {
      "id": data[i].id,
      "_ref": data[i]._ref,
      "createdBy": data[i].data.createdBy,
      "createdTime": data[i].data.createdTime,
      "name": data[i].data.name,
      "lastConnection": data[i].data.lastConnection
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
        "createdBy": data[i].data.createdBy,
        "createdTime": data[i].data.createdTime,
        "name": data[i].data.name,
        "lastConnection": data[i].data.lastConnection
      },
      "token": {
        "expiresAt": data[i].tokenexp,
        "token": data[i].token
      }};
  }
  return servers;
}

function parserGetServers(r, response) {
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data);
  }
  return basicParser.extendedParser(r, response, "servers", data, 200);
}

function parserGetServer(r, response){
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "server", data, 200);
}

function parserPutServer(r, response){
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "server", data, 200);
}

function parserDeleteServer(r, response){
  if ((r.success) && (!r.data_retrieved.length)){
    r.status = 404;
    r.success = false;
  }
  if (!r.success){
    return basicParser.reducedParser(r, response);
  }
  return response.sendStatus(204);
}

function parserPostServer(r, response){
  var data = r.data_retrieved;
  if (r.success){
    data = rdataPost(data)[0];
  }
  else{
    return basicParser.reducedParser(r, response);
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "server", data, 201);
}


module.exports = {
  parserGetServer : parserGetServer,
  parserGetServers : parserGetServers,
  parserPutServer : parserPutServer,
  parserDeleteServer : parserDeleteServer,
  parserPostServer : parserPostServer
};
