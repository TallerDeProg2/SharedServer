var controller = require('../controllers/controllerRoutes/controllerUsers.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Users.
  */

router.get('/users', function(request, response) {
    controller.getUsers(request, response);
});

router.post('/users', function(request, response) {
    controller.postUsers(request, response);
});

router.post('/users/validate', function(request, response) {
    controller.postUsersValidate(request, response);
});

router.delete('/users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.deleteUser(userId, request, response);
});

router.get('/users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.getUser(userId, request, response);
});

router.put('/users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.putUser(userId, request, response);
});

/**#@-*/
