/** @module routerBusinessUsers */

var controller = require('../controllers/controllerRoutes/controllerBusinessUsers.js');

/**
 * Express router, BusinessUsers endpoints
 * type {Object}
 */
var router = require('./router.js');


/**
 * @name GET/BusinessUsers
 * @function
 * @memberof module:routerBusinessUsers
 * @inner
 */
router.get('/business-users', function(request, response) {
    controller.getBusinessUsers(request, response);
});

/**
 * @name POST/BusinessUsers
 * @function
 * @memberof module:routerBusinessUsers
 * @inner
 */
router.post('/business-users', function(request, response) {
    controller.postBusinessUsers(request, response);
});

/**
 * @name DELETE/BusinessUsers
 * @function
 * @memberof module:routerBusinessUsers
 * @inner
 */
router.delete('/business-users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.deleteBusinessUser(userId, request, response);
});

/**
 * @name PUT/BusinessUsers
 * @function
 * @memberof module:routerBusinessUsers
 * @inner
 */
router.put('/business-users/:userId', function(request, response) {
    var userId = request.params.userId;
    controller.putBusinessUser(userId, request, response);
});

/**
 * @name GET/BusinessUsers/me
 * @function
 * @memberof module:routerBusinessUsers
 * @inner
 */
router.get('/business-users/me', function(request, response) {
    controller.getBusinessUsersMe(request, response);
});

/**
 * @name POST/token
 * @function
 * @memberof module:routerBusinessUsers
 * @inner
 */
router.post('/token', function(request, response) {
    controller.postToken(request, response);
});
