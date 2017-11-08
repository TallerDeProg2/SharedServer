var controller = require('../controllers/controllerRoutes/controllerUsersCars.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Users' cars.
  */

router.get('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.getUserCar(userId, request, response);
});

router.post('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.postUserCar(userId, request, response);
});

router.delete('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    var carId = request.params.carId;
    controller.deleteUserCar(userId, request, response);
});

router.put('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.putUserCar(userId, request, response);
});

/**#@-*/
