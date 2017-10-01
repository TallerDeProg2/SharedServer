var controller = require('../controllers/controllerRoutes/controllerBusinessUsers.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Business Ussers.
  */

router.get('/business-users', function(request, response) {
    controller.getBusinessUsers(request, response);
});

router.post('/business-users', function(request, response) {
    controller.postBusinessUsers(request, response);
});

router.delete('/business-users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.deleteBusinessUser(userId, request, response);
});

router.put('/business-users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.putBusinessUser(userId, request, response);
});

router.get('/business-users/me', function(request, response) {
    controller.getBusinessUsersMe(request, response);
});

router.put('/business-users/me', function(request, response) {
    controller.putBusinessUsersMe(request, response);
});

/**#@-*/
