/** @module routerTrips */

var controller = require('../controllers/controllerRoutes/controllerTrips.js');

/**
 * Express router, Trips endpoints.
 * type {Object}
 */
var router = require('./router.js');

/**
 * @name GET/users/:userId/trips
 * @function
 * @memberof module:routerTrips
 * @inner
 */
router.get('/users/:userId/trips', function(request, response) {
    var userId = request.params.userId;
    controller.getUserTrips(userId, request, response);
});

/**
 * @name POST/trips
 * @function
 * @memberof module:routerTrips
 * @inner
 */
router.post('/trips', function(request, response) {
    controller.postTrips(request, response);
});

/**
 * @name POST/trips/estimate
 * @function
 * @memberof module:routerTrips
 * @inner
 */
router.post('/trips/estimate', function(request, response) {
    controller.postTripEstimate(request, response);
});

/**
 * @name GET/trips/:tripId
 * @function
 * @memberof module:routerTrips
 * @inner
 */
router.get('/trips/:tripId', function(request, response) {
    var tripId = request.params.tripId;
    controller.getTrip(tripId, request, response);
});
