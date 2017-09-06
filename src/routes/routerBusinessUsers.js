var controller = require('../controllers/controllerBusinessUsers.js');

var router = require('./router.js');

router.get('/business-users', function(request, response) {
    controller.getBusinessUsers();
});

router.post('/business-users', function(request, response) {
    controller.postBusinessUsers();
});

router.delete('/business-users/{userId}', function(request, response) {
    controller.deleteBusinessUser(userId);
});

router.put('/business-users/{userId}', function(request, response) {
    controller.putBusinessUser(userId);
});

router.get('/business-users/me', function(request, response) {
    controller.getBusinessUsersMe();
});

router.put('/business-users/me', function(request, response) {
    controller.putBusinessUsersMe();
});
