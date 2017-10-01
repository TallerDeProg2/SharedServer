var controller = require('../controllers/controllerRoutes/controllerTrips.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Trips.
  */

router.get('/users/:userId/trips', function(request, response) {
    var userId = request.params.userId;
    controller.getUserTrips(userId, request, response);
});

router.post('/trips', function(request, response) {
    controller.postTrips(request, response);
});

router.post('/trips/estimate', function(request, response) {
    controller.postTripEstimate(request, response);
});

router.get('/trips/:tripId', function(request, response) {
    var tripId = request.params.tripId;
    controller.getTrip(tripId, request, response);
});

/**#@-*/
