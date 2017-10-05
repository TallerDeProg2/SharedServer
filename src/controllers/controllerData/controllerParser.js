const version = '1.0';

function jsonParser(j) {
  var str = JSON.stringify(j);
  return JSON.parse(str);
}


//----------------------->Basic Parsers<-----------------------//

function reducedParser(r, response){
  return response.status(r.status).json({code: r.status, message: r.data});
}

function metadata(data){
  var jObj = {
    "count": data.length,
    "version": version
  };
  return jObj;
}


function extendedParser(r, response, tag, rdata, ok_status){
  if (!r.success){
    return reducedParser(r, response);
  }
  var jObj = {};
  jObj.metadata = metadata();
  jObj[tag] = rdata;
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



module.exports = {
  extendedParser : extendedParser,
  reducedParser : reducedParser
};
