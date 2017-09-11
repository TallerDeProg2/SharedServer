var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser');

var format = require('string-format');

function getServers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM servers', response, parser.parserServers);
}

function getServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var q = 'SELECT * FROM servers WHERE id={}'.format(serverId);
  dataBase.query(q, response, parser.parserServers);
}


function postServer(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var id = "";
  var _ref = "";
  var createdBy = request.body.createdBy;
  var createdTime = request.body.createdTime;
  var name = request.body.name;
  var lastConnection = "";
  var token = "";
  var exp = "";
  var q = 'INSERT INTO servers(id, _ref, createdBy, createdTime, name, lastConnection, token, tokenexp) values({},{},{},{},{},{},{},{})'.format(id, _ref, createdBy, createdTime, name, lastConnection);
  dataBase.query(q, response, parser.parserServers);
}

function putServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var _ref = request.body._ref;
  var name = request.body.name;
  var q = 'UPDATE servers SET _ref={}, name={} WHERE id={}'.format(_ref, name, serverId);
  dataBase.query(q, response, parser.parserServers);

}

function postServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var token = "";
  var exp = "";
  var q = 'UPDATE servers SET token={}, tokenexp={} WHERE id={}'.format(token, exp, serverId);
  dataBase.query(q, response, parser.parserServers);
}

function deleteServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  var q = 'DELETE * FROM servers WHERE id=\''+serverId+'\'';
  dataBase.query(q, response, parser.parserServers);
}

function postServerPing(request, response) {}

function postToken(request, response) {}
