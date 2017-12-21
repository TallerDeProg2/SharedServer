/** @module routerUsersCards */

var controller = require('../controllers/controllerRoutes/controllerUsersCars.js');

/**
 * Express router, UsersCars endpoints.
 * type {Object}
 */
var router = require('./router.js');

/**
 * @name GET/users/:userId/car
 * @function
 * @memberof module:routerUsersCars
 * @inner
 */
router.get('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.getUserCar(userId, request, response);
});

/**
 * @name POST/users/:userId/car
 * @function
 * @memberof module:routerUsersCars
 * @inner
 */
router.post('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.postUserCar(userId, request, response);
});

/**
 * @name DELETE/users/:userId/car
 * @function
 * @memberof module:routerUsersCars
 * @inner
 */
router.delete('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    var carId = request.params.carId;
    controller.deleteUserCar(userId, request, response);
});

/**
 * @name PUT/users/:userId/car
 * @function
 * @memberof module:routerUsersCars
 * @inner
 */
router.put('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.putUserCar(userId, request, response);
});

/**#@-*/
