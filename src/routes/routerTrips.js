var controller = require('../controllers/controllerTrips.js');

var router = require('./router.js');

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
