var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser');

function getServers(request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM servers', response, parser.basicParser);

}

function getServer(serverId, request, response) {
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }*/
  dataBase.query('SELECT * FROM servers WHERE id=($1)', [serverId], response, parser.basicParser);
}

function postServer(request, response) {}

function putServer(serverId, request, response) {}

function postServer(serverId, request, response) {}

function deleteServer(serverId, request, response) {}

function postServerPing(request, response) {}

function postToken(request, response) {}
