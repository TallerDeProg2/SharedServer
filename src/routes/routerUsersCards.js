/** @module routerUsersCards */

var controller = require('../controllers/controllerRoutes/controllerUsersCards.js');

/**
 * Express router, UsersCards endpoints.
 * type {Object}
 */
var router = require('./router.js');

/**
 * @name GET/users/:userId/card
 * @function
 * @memberof module:routerUsersCards
 * @inner
 */
router.get('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.getUserCard(userId, request, response);
});

/**
 * @name POST/users/:userId/card
 * @function
 * @memberof module:routerUsersCards
 * @inner
 */
router.post('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.postUserCard(userId, request, response);
});

/**
 * @name PUT/users/:userId/card
 * @function
 * @memberof module:routerUsersCards
 * @inner
 */
router.put('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.putUserCard(userId, request, response);
});

/**
 * @name DELETE/users/:userId/card
 * @function
 * @memberof module:routerUsersCards
 * @inner
 */
router.delete('/users/:userId/card', function(request, response) {
    var userId = request.params.userId;
    controller.deleteUserCard(userId, request, response);
});
