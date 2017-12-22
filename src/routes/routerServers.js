/** @module routerServers */

var controller = require('../controllers/controllerRoutes/controllerServers.js');

/**
 * Express router, Servers endpoints.
 * type {Object}
 */
var router = require('./router.js');

/**
 * @name GET/Servers
 * @function
 * @memberof module:routerServers
 * @inner
 */
router.get('/servers', function(request, response) {
    controller.getServers(request, response);
});

/**
 * @name GET/Servers/:serverId
 * @function
 * @memberof module:routerServers
 * @inner
 */
router.get('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    controller.getServer(serverId, request, response);
});

/**
 * @name POST/Servers
 * @function
 * @memberof module:routerServers
 * @inner
 */
router.post('/servers', function(request, response) {
    controller.postServer(request, response);
});

/**
 * @name PUT/Servers/:serverId
 * @function
 * @memberof module:routerServers
 * @inner
 */
router.put('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    controller.putServer(serverId, request, response);
});

/**
 * @name POST/Servers/:serverId
 * @function
 * @memberof module:routerServers
 * @inner
 */
router.post('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    if (serverId == "ping"){
      controller.postServerPing(request, response);
    }else{
      controller.postServerToken(serverId, request, response);
    }
});

/**
 * @name DELETE/servers/:serverId
 * @function
 * @memberof module:routerServers
 * @inner
 */
router.delete('/servers/:serverId', function(request, response) {
    var serverId = request.params.serverId;
    controller.deleteServer(serverId, request, response);
});
