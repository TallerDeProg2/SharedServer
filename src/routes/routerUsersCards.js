var controller = require('../controllers/controllerRoutes/controllerUsersCards.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Cards.
  */

router.get('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.getUserCard(userId, request, response);
});

router.post('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.postUserCard(userId, request, response);
});

router.put('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.putUserCard(userId, request, response);
});

router.delete('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.deleteUserCard(userId, request, response);
});

/**#@-*/
