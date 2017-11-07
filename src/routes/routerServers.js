var controller = require('../controllers/controllerRoutes/controllerServers.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Servers.
  */

router.get('/servers', function(request, response) {
    controller.getServers(request, response);
});

router.get('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    controller.getServer(serverId, request, response);
});

router.post('/servers', function(request, response) {
    controller.postServer(request, response);
});

router.put('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    controller.putServer(serverId, request, response);
});

router.post('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    if (serverId == "ping"){
      controller.postServerPing(request, response);
    }else{
      controller.postServerToken(serverId, request, response);
    }
});

router.delete('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    controller.deleteServer(serverId, request, response);
});

/**#@-*/
