var controller = require('../controllers/controllerServers.js');

var router = require('./router.js');


router.get('/servers', function(request, response) {
    controller.getServers();
});

router.get('/servers/{serverId}', function(request, response) { 
    controller.getServer(serverId);
});

router.post('/servers', function(request, response) {
    controller.postServer();
});

router.put('/servers/{serverId}', function(request, response) {
    controller.putServer(serverId);
});

router.post('/servers/{serverId}', function(request, response) {
    controller.postServer(serverId);
});

router.delete('/servers/{serverId}', function(request, response) {
    controller.deleteServer(serverId);
});

router.post('/servers/ping', function(request, response) {
    controller.postServerPing();
});

router.post('/token', function(request, response) {
    controller.postToken();
});
