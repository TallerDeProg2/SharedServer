function jsonParser(j) {
  var str = JSON.stringify(j);
  return JSON.parse(str);
}

//----------------------->Basic Parsers<-----------------------//

function reducedParser(r, response){
  return response.status(r.status).json({code: r.status, message: r.data});
}

function extendedParser(r, response, tag, ok_status){
  if (!r.success){
    return reducedParser(r, response);
  }
  var jObj = {metadada: { //TODO: complete
    "count": 0,
    "total": 0,
    "next": "string",
    "prev": "string",
    "first": "string",
    "last": "string",
    "version": "string"
  }};
  jObj[tag] = r.data;
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
  parserServers(r, response, 201);
}

function parserServersPut(r, response){
  parserServers(r, response, 200);
}

function parserServersDelete(r, response){
  parserServers(r, response, 204);
}

function parserServersGet(r, response){
  parserServers(r, response, 200);
}

//----------------------------------------------//

module.exports = {
    parserServersGet : parserServersGet,
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
