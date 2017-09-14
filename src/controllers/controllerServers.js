var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser');

var logger = require('../srv/log.js');

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

function getServers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var q = 'SELECT * FROM servers';
  dataBase.query(q, response, parser.parserServers, 200);
}

function getServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var q = 'SELECT * FROM servers WHERE id=\'{}\''.format(serverId);
  dataBase.query(q, response, parser.parserServers, 200);
}


function postServer(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/

  var now = moment();
  var formatted = now.format('YYYY-MM-DD HH:mm:ss Z');

  var id = "";
  var _ref = "";
  var createdBy = request.body.createdBy;
  var createdTime = formatted; //request.body.createdTime;
  var name = request.body.name;
  var lastConnection = formatted;
  var token = "";
  var exp = formatted;
  logger.info(createdBy);
  logger.info(createdTime);
  logger.info(name);
  var q = 'INSERT INTO servers(id, _ref, createdBy, createdTime, name, lastConnection, token, tokenexp) values(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.format(id, _ref, createdBy, createdTime, name, lastConnection, token, exp);
  dataBase.query(q, response, parser.parserServers, 201);
}

function putServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var _ref = request.body._ref;
  var name = request.body.name;
  var q = 'UPDATE servers SET _ref=\'{}\', name=\'{}\' WHERE id=\'{}\''.format(_ref, name, serverId);
  dataBase.query(q, response, parser.parserServers, 200);

}

function postServerToken(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var token = "";
  var exp = "";
  var q = 'UPDATE servers SET token=\'{}\', tokenexp=\'{}\' WHERE id=\'{}\''.format(token, exp, serverId);
  dataBase.query(q, response, parser.parserServers, 201);
}

function deleteServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var q = 'DELETE * FROM servers WHERE id=\''+serverId+'\'';
  dataBase.query(q, response, parser.parserServers, 204);
}

function postServerPing(request, response) {}

function postToken(request, response) {}

module.exports = {
    postServer : postServer,
    getServers : getServers,
    getServer : getServer,
    putServer : putServer,
    postServerToken : postServerToken,
    postToken : postToken,
    postServerPing : postServerPing,
    deleteServer : deleteServer
};
