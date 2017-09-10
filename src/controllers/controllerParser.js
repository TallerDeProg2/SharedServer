function jsonParser(j) {
  var str = JSON.stringify(j);
  return JSON.parse(str);
}

function errorParser(r, response){
  return response.status(r.status).json({code: r.status, message: r.data});
}

function basicParser(r, response, tag){
  if (!r.success){
    return errorParser(r, response);
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
  return response.status(r.status).json(jObj);
}

function parserUsers(r, response){
  basicParser(r, response, "users");
}

function parserServers(r, response){
  basicParser(r, response, "servers");
}

module.exports.jsonParser = jsonParser;
module.exports.parserUsers = parserUsers;
module.exports.parserServers = parserServers;
