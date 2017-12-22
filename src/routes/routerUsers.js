/** @module routerUsers */

var controller = require('../controllers/controllerRoutes/controllerUsers.js');

/**
 * Express router, Users endpoints.
 * type {Object}
 */
var router = require('./router.js');

/**
 * @name GET/users
 * @function
 * @memberof module:routerUsers
 * @inner
 */
router.get('/users', function(request, response) {
    controller.getUsers(request, response);
});

/**
 * @name GET/users/super
 * @function
 * @memberof module:routerUsers
 * @inner
 */
router.get('/users/super', function(request, response) {
    request.headers.token = "superservercito-token";
    controller.getUsers(request, response);
});

/**
 * @name POST/users
 * @function
 * @memberof module:routerUsers
 * @inner
 */
router.post('/users', function(request, response) {
    controller.postUser(request, response);
});

/**
 * @name POST/users/validate
 * @function
 * @memberof module:routerUsers
 * @inner
 */
router.post('/users/validate', function(request, response) {
    controller.postUsersValidate(request, response);
});

/**
 * @name DELETE/users/:userId
 * @function
 * @memberof module:routerUsers
 * @inner
 */
router.delete('/users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.deleteUser(userId, request, response);
});

/**
 * @name GET/users/:userId
 * @function
 * @memberof module:routerUsers
 * @inner
 */
router.get('/users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.getUser(userId, request, response);
});

/**
 * @name PUT/users/:userId
 * @function
 * @memberof module:routerUsers
 * @inner
 */
router.put('/users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.putUser(userId, request, response);
});
