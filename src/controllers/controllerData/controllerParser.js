/** @module controllerParser */

/**
* ControllerParser for all the endpoints
*/

const version = '1.0';

//----------------------->Basic Parsers<-----------------------//

/**
 * @function reducedParser
 * @param {json} r a json object with the status and the data data_retrieved from a certain query.
 * @param {response} response the response that will be send to the request.
 * @return sends to the response the status of the query and a json with the same status and a message.
 * @memberof module:controllerParser
 */
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

/**
 * @function extendedParser
 * @param {json} r a json object with the status and the data data_retrieved from a certain query.
 * @param {response} response the response that will be send to the request.
 * @param {string} tag the tag that will have the json object send to the request.
 * @param {array} rdata the data that will be send within the tag.
 * @param {number} ok_status the status that should be send if the query was succesful.
 * @return sends to the response the status of the query and a json a certain tag and data.
 * @memberof module:controllerParser
 */
function extendedParser(r, response, tag, rdata, ok_status){
  if (!r.success){
    return reducedParser(r, response);
  }
  var jObj = {};
  jObj.metadata = metadata(rdata);
  jObj[tag] = rdata;
  return response.status(ok_status).json(jObj);
}

/**
 * @function deleteParser
 * @param {json} r a json object with the status and the data data_retrieved from a certain query.
 * @param {response} response the response that will be send to the request.
 * @return sends to the response the status of the query and a json with the same status and a message.
 * @memberof module:controllerParser
 */
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
