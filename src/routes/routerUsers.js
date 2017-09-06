var controller = require('../controllers/controllerUsers.js');

var router = require('./router.js');

router.get('/users', function(request, response) {
    controller.getUsers(request, response);
});

router.post('/users', function(request, response) {
    controller.postUsers();
});

router.post('/users/validate', function(request, response) {
    controller.postUsersValidate();
});

router.delete('/users/{userId}', function(request, response) {
    controller.deleteUser(userId);
});

router.get('/users/{userId}', function(request, response) {
    controller.getUser(userId);
});

router.put('/users/{userId}', function(request, response) {
    controller.putUser(userId);
});
