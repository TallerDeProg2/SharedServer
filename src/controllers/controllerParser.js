function jsonParser(j) {
  var str = JSON.stringify(j);
  return JSON.parse(str);
}

//----------------------->Basic Parsers<-----------------------//

function reducedParser(r, response){
  return response.status(r.status).json({code: r.status, message: r.data});
}

function metadata(){
  var jObj = { //TODO: complete
    "count": 0,
    "total": 0,
    "next": "string",
    "prev": "string",
    "first": "string",
    "last": "string",
    "version": "string"
  };
  return jObj;
}

function extendedParser(r, response, tag, ok_status){
  if (!r.success){
    return reducedParser(r, response);
  }
  var jObj = {};
  jObj.metadata = metadata();
  jObj[tag] = r.data;
  return response.status(ok_status).json(jObj);
}

function extendedParserSingle(r, response, tag, ok_status){
  if (!r.success){
    return reducedParser(r, response);
  }
  var jObj = {};
  jObj.metadata = metadata();
  jObj[tag] = r.data[0];
  return response.status(ok_status).json(jObj);
}

//----------------------------------------------//

//----------------------->Parser Users<-----------------------// //TODO: rethink code

function parserUsers(r, response, ok_status){
  extendedParser(r, response, "users", ok_status);
}

function parserUsersPost(r, response){
  parserUsers(r, response, 201);
}

function parserUsersPut(r, response){
  parserUsers(r, response, 200);
}

function parserUsersDelete(r, response){
  parserUsers(r, response, 204);
}

function parserUsersGet(r, response){
  parserUsers(r, response, 200);
}

//----------------------------------------------//

//----------------------->Parser Business Users<-----------------------//
function parserBusinessUsers(r, response, ok_status){
  extendedParser(r, response, "businessUsers", ok_status);
}

function parserBusinessUsersPost(r, response){
  parserBusinessUsers(r, response, 201);
}

function parserBusinessUsersPut(r, response){
  parserBusinessUsers(r, response, 200);
}

function parserBusinessUsersDelete(r, response){
  parserBusinessUsers(r, response, 204);
}

function parserBusinessUsersGet(r, response){
  parserBusinessUsers(r, response, 200);
}

//----------------------------------------------//

//----------------------->Parser Servers<-----------------------//
function parserServers(r, response, ok_status){
  extendedParser(r, response, "servers", ok_status);
}


function parserServersPost(r, response){
  if (!r.success){
    return reducedParser(r, response);
  }
  var jObj = {
    "metadata": {
      "version": "string"
    },
    "server": {
      "server": {
        "id": r.data[0].id,
        "_ref": r.data[0].id._ref,
        "createdBy": r.data[0].createdBy,
        "createdTime": r.data[0].createdTime,
        "name": r.data[0].name,
        "lastConnection": r.data[0].lastConnection
      },
      "token": {
        "expiresAt": r.data[0].tokenexp,
        "token": r.data[0].token
      }
    }
  };
  return response.status(201).json(jObj);
}

function parserServersPut(r, response){
  if (!r.success){
    return reducedParser(r, response);
  }
  var jObj = {
    "metadata": {
      "version": "string"
    },
    "server": {
      "id": r.data[0].id,
      "_ref": r.data[0].id._ref,
      "createdBy": r.data[0].createdBy,
      "createdTime": r.data[0].createdTime,
      "name": r.data[0].name,
      "lastConnection": r.data[0].lastConnection
    }
  };
  return response.status(200).json(jObj);
}

function parserServersDelete(r, response){
  if (!r.success){
    return reducedParser(r, response);
  }
  return response.status(204);
}

function parserServerGet(r, response){
  return parserServersPut(r,response);
}

function parserServersGet(r,response){
  var jObj = {};
  jObj.metadata = metadata();
  jObj.servers = [];
  for (var i = 0; i < r.data.length; i++) {
    var data = r.data[i];
    jObj.servers[i] = {
      "id": data.id,
      "_ref": data.id._ref,
      "createdBy": data.createdBy,
      "createdTime": data.createdTime,
      "name": data.name,
      "lastConnection": data.lastConnection
    };
  }
  return response.status(200).json(jObj);
}

//----------------------------------------------//

module.exports = {
    parserServersGet : parserServersGet,
    parserServerGet : parserServerGet,
    parserServersDelete : parserServersDelete,
    parserServersPut : parserServersPut,
    parserServersPost : parserServersPost,

    parserUsersGet : parserUsersGet,
    parserUsersDelete : parserUsersDelete,
    parserUsersPut : parserUsersPut,
    parserUsersPost : parserUsersPost,

    parserBusinessUsersGet : parserBusinessUsersGet,
    parserBusinessUsersDelete : parserBusinessUsersDelete,
    parserBusinessUsersPut : parserBusinessUsersPut,
    parserBusinessUsersPost : parserBusinessUsersPost,
};
