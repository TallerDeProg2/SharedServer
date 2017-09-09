var controller = require('../controllers/controllerServers.js');

var router = require('./router.js');


router.get('/servers', function(request, response) {
    controller.getServers(request, response);
});

router.get('/servers/{serverId}', function(request, response) {
    controller.getServer(serverId, request, response);
});

router.post('/servers', function(request, response) {
    controller.postServer(request, response);
});

router.put('/servers/{serverId}', function(request, response) {
    controller.putServer(serverId, request, response);
});

router.post('/servers/{serverId}', function(request, response) {
    controller.postServer(serverId, request, response);
});

router.delete('/servers/{serverId}', function(request, response) {
    controller.deleteServer(serverId, request, response);
});

router.post('/servers/ping', function(request, response) {
    controller.postServerPing();
});

router.post('/token', function(request, response) {
    controller.postToken();
});
