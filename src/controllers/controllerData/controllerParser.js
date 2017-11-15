const version = '1.0';

//----------------------->Basic Parsers<-----------------------//

function reducedParser(r, response){
  return response.status(r.status).json({code: r.status, message: r.data_retrieved});
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
  jObj.metadata = metadata(rdata);
  jObj[tag] = rdata;
  return response.status(ok_status).json(jObj);
}

function deleteParser(r, response) {
  if ((r.success) && (!r.data_retrieved.length)){
    r.status = 404;
    r.success = false;
  }
  if (!r.success){
    return reducedParser(r, response);
  }
  return response.sendStatus(204);
}

//----------------------------------------------//

module.exports = {
  extendedParser : extendedParser,
  reducedParser : reducedParser,
  deleteParser : deleteParser
};
