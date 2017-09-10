var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser');

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
  var q = 'SELECT * FROM servers WHERE id=\''+serverId+'\'';
  dataBase.query(q, response, parser.parserServers);
}

function postServer(request, response) {}

function putServer(serverId, request, response) {}

function postServer(serverId, request, response) {}

function deleteServer(serverId, request, response) {}

function postServerPing(request, response) {}

function postToken(request, response) {}
